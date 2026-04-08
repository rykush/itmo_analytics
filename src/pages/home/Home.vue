<script setup lang="ts">
import { computed, ref } from "vue";
import BooksList from "@/pages/home/booksList.vue";
import { useBookStore } from "@/entities/book/bookStore";
import { type bookData } from "@/entities/book/bookTypes";

const bookStore = useBookStore();
const searchQuery = ref('');

const filteredBooks = computed(() => {
  if (!searchQuery.value) return bookStore.books;

  const query = searchQuery.value.toLowerCase();

  return Object.fromEntries(
    Object.entries(bookStore.books).filter(([, book]) => {
      const typedBook = book as bookData;
      return typedBook.name.toLowerCase().includes(query);
    })
  );
});
</script>

<template>
  <div class="relative max-w-full overflow-y-auto w-full flex flex-col items-center">

    <div class="relative desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] w-[280px] flex flex-col items-center">

      <BooksList 
        :filtered-books="filteredBooks" 
        :search-query="searchQuery"
      />

      <div 
        v-if="searchQuery && Object.keys(filteredBooks).length === 0" 
        class="w-full flex items-start"
      >
        <p class="text-[16px] text-accent leading-5">
          По вашему запросу ничего не найдено
        </p>
      </div>

    </div>

  </div>
</template>