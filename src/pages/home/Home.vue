<script setup lang="ts">
import { computed, ref } from "vue";
import BooksList from "@/pages/home/booksList.vue";
import BookFilter from "@/features/book-filter/bookFilter.vue";
import { useBookStore } from "@/entities/book/bookStore";
import { type bookData } from "@/entities/book/bookTypes";

type Filters = {
  author: string;
  genre: string;
  year: string;
  isRead: boolean;
  isFavorite: boolean;
};

const bookStore = useBookStore();

const searchQuery = ref("");

const activeFilters = ref<Filters>({
  author: "",
  genre: "",
  year: "",
  isRead: false,
  isFavorite: false
});

const handleFilter = (filters: Filters) => {
  activeFilters.value = filters;
};

const filteredBooks = computed(() => {
  let books = Object.entries(bookStore.books);

  const f = activeFilters.value;

  books = books.filter(([, book]) => {
    const b = book as bookData;

    if (
      searchQuery.value &&
      !b.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) {
      return false;
    }

    if (
      f.author &&
      !b.author.toLowerCase().includes(f.author.toLowerCase())
    ) {
      return false;
    }

    if (
      f.genre &&
      !b.genre.toLowerCase().includes(f.genre.toLowerCase())
    ) {
      return false;
    }

    if (
        f.year &&
        !b.year.toString().includes(f.year.toString())
    ) {
        return false;
    }

    if (f.isRead && !b.isRead) return false;
    if (f.isFavorite && !b.isFavorite) return false;

    return true;
  });

  return Object.fromEntries(books);
});
</script>

<template>
  <div class="relative max-w-full overflow-y-auto w-full flex flex-col items-center">

    <div class="relative desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] w-[280px] flex flex-col items-center">

      <BookFilter @apply="handleFilter" />

      <BooksList
        :filtered-books="filteredBooks"
        :search-query="searchQuery"
      />

      <div
        v-if="Object.keys(filteredBooks).length === 0"
        class="w-full flex items-start"
      >
        <p class="text-[16px] text-accent leading-5">
          По вашему запросу ничего не найдено
        </p>
      </div>

    </div>
  </div>
</template>