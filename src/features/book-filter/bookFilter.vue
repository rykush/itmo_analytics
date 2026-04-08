<script setup lang="ts">
import { ref, computed } from "vue";
import { useBookStore } from "@/entities/book/bookStore";

const bookStore = useBookStore();
const filters = ref({
  isRead: false,
  isFavorite: false,
  genre: '',
  yearFrom: '',
  yearTo: ''
});

const applyFilter = () => {
  if ((window as any).ym) {
    (window as any).ym(108437493, 'reachGoal', 'filter_applied', {
      filters: filters.value
    });
  }

};

const resetFilters = () => {
  filters.value = {
    isRead: false,
    isFavorite: false,
    genre: '',
    yearFrom: '',
    yearTo: ''
  };
};
</script>

<template>
  <div class="p-4 bg-layer rounded-lg mb-4">
    <h3 class="text-lg font-semibold mb-3">Фильтры</h3>
    <div class="grid grid-cols-1 gap-3">
      <label class="flex items-center">
        <input type="checkbox" v-model="filters.isRead" class="mr-2" />
        Прочитано
      </label>
      <label class="flex items-center">
        <input type="checkbox" v-model="filters.isFavorite" class="mr-2" />
        Избранное
      </label>
      <input
        type="text"
        v-model="filters.genre"
        placeholder="Жанр"
        class="p-2 border rounded"
      />
      <input
        type="number"
        v-model="filters.yearFrom"
        placeholder="Год от"
        class="p-2 border rounded"
      />
      <input
        type="number"
        v-model="filters.yearTo"
        placeholder="Год до"
        class="p-2 border rounded"
      />
    </div>
    <div class="mt-3 flex gap-2">
      <button
        @click="applyFilter"
        class="px-4 py-2 bg-green text-white rounded hover:bg-greenHover"
      >
        Применить
      </button>
      <button
        @click="resetFilters"
        class="px-4 py-2 bg-red text-white rounded hover:bg-redHover"
      >
        Сбросить
      </button>
    </div>
  </div>
</template>
