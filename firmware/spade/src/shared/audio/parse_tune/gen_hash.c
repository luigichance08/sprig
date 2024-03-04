// prints out a C file containing a hashmap of fnv1_hash'd tone string -> frequency

#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#define ARR_LEN(arr) (sizeof(arr) / sizeof(arr[0]))
#define HashIndex int16_t

static uint64_t fnv1_hash(void *key, int n_bytes) {
  unsigned char *p = (unsigned char *)key;
  uint64_t h = 14695981039346656037ul;
  for (int i = 0; i < n_bytes; i++)
    h = (h * 1099511628211) ^ p[i];
  return h;
}

char *fnv1_hash_src = 
  "static uint64_t fnv1_hash(void *key, int n_bytes) {\n"
  "  unsigned char *p = (unsigned char *)key;\n"
  "  uint64_t h = 14695981039346656037ul;\n"
  "  for (int i = 0; i < n_bytes; i++)\n"
  "    h = (h * 1099511628211) ^ p[i];\n"
  "  return h;\n"
  "}\n";

typedef struct {
  char *str;
  uint16_t freq;
} Tone;

Tone tones[] = {
  {  "b0",   31, },
  {  "c1",   33, },
  { "c#1",   35, },
  {  "d1",   37, },
  { "d#1",   39, },
  {  "e1",   41, },
  {  "f1",   44, },
  { "f#1",   46, },
  {  "g1",   49, },
  { "g#1",   52, },
  {  "a1",   55, },
  { "a#1",   58, },
  {  "b1",   62, },
  {  "c2",   65, },
  { "c#2",   69, },
  {  "d2",   73, },
  { "d#2",   78, },
  {  "e2",   82, },
  {  "f2",   87, },
  { "f#2",   93, },
  {  "g2",   98, },
  { "g#2",  104, },
  {  "a2",  110, },
  { "a#2",  117, },
  {  "b2",  123, },
  {  "c3",  131, },
  { "c#3",  139, },
  {  "d3",  147, },
  { "d#3",  156, },
  {  "e3",  165, },
  {  "f3",  175, },
  { "f#3",  185, },
  {  "g3",  196, },
  { "g#3",  208, },
  {  "a3",  220, },
  { "a#3",  233, },
  {  "b3",  247, },
  {  "c4",  262, },
  { "c#4",  277, },
  {  "d4",  294, },
  { "d#4",  311, },
  {  "e4",  330, },
  {  "f4",  349, },
  { "f#4",  370, },
  {  "g4",  392, },
  { "g#4",  415, },
  {  "a4",  440, },
  { "a#4",  466, },
  {  "b4",  494, },
  {  "c5",  523, },
  { "c#5",  554, },
  {  "d5",  587, },
  { "d#5",  622, },
  {  "e5",  659, },
  {  "f5",  698, },
  { "f#5",  740, },
  {  "g5",  784, },
  { "g#5",  831, },
  {  "a5",  880, },
  { "a#5",  932, },
  {  "b5",  988, },
  {  "c6", 1047, },
  { "c#6", 1109, },
  {  "d6", 1175, },
  { "d#6", 1245, },
  {  "e6", 1319, },
  {  "f6", 1397, },
  { "f#6", 1480, },
  {  "g6", 1568, },
  { "g#6", 1661, },
  {  "a6", 1760, },
  { "a#6", 1865, },
  {  "b6", 1976, },
  {  "c7", 2093, },
  { "c#7", 2217, },
  {  "d7", 2349, },
  { "d#7", 2489, },
  {  "e7", 2637, },
  {  "f7", 2794, },
  { "f#7", 2960, },
  {  "g7", 3136, },
  { "g#7", 3322, },
  {  "a7", 3520, },
  { "a#7", 3729, },
  {  "b7", 3951, },
  {  "c8", 4186, },
  { "c#8", 4435, },
  {  "d8", 4699, },
  { "d#8", 4978, },
};

int main(void) {
  puts("// this file has been generated by gen_hash.c");
  puts("");

  HashIndex *map = NULL;

  for (int size = 1; 1; size++) {
    int map_size = ARR_LEN(tones) * size;

    if (map) free(map);
    map = calloc(sizeof(HashIndex), map_size);

    for (int i = 0; i < map_size; i++)
      map[i] = -1;

    for (int i = 0; i < ARR_LEN(tones); i++) {
      Tone *t = tones + i;
      uint64_t hash = fnv1_hash(t->str, strlen(t->str)) % map_size;

      if (map[hash] != -1) {
        printf("// collision(%2d): %4s <-> %4s\n", size, t->str, tones[map[hash]].str);
        goto RETRY;
      }
      map[hash] = i;
      // printf("{ note: %s, hash: %llu }\n", t->str, hash % ARR_LEN(tones));
    }

    printf(
      "\n// optimal size multiplier is %d! (%lu bytes)\n\n",
      size, size*ARR_LEN(tones)*sizeof(HashIndex)
    );

    puts("#include <stdint.h>\n\n");

    puts(fnv1_hash_src);
    printf("uint16_t tone_map[%d] = {\n", map_size);

    for (int i = 0; i < ARR_LEN(tones); i++) {
      Tone *t = tones + i;
      uint64_t hash = fnv1_hash(t->str, strlen(t->str)) % map_size;
      printf("  [%4llu] = %4d,\n", hash, t->freq);
    }

    puts("};");

    break;

    RETRY:
      ;
  }
}