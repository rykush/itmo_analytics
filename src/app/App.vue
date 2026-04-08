<script setup lang="ts">
import AppButton from "@/shared/ui/AppButton.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppDialog from "@/shared/ui/AppDialog.vue";
import FormAdd from "@/features/add-book/formAdd.vue";
import { useBookStore } from "@/entities/book/bookStore.ts";

const route = useRoute();
const bookStore = useBookStore();

const dialogTarget = ref<InstanceType<typeof AppDialog>>();
const screenWidth = ref(window.innerWidth);
const isSearching = ref(false);

const showDialog = () => dialogTarget.value?.show();

const searchQuery = ref("");

const isWelcomePage = computed(() => route.path === "/welcome");


let lastWidth = window.innerWidth;

const updateWidth = () => {
  const newWidth = window.innerWidth;
  if (newWidth !== lastWidth) {
    screenWidth.value = newWidth;
    lastWidth = newWidth;

    if (screenWidth.value >= 320) {
      isSearching.value = false;
    }
  }
};

onMounted(() => {
  bookStore.getBooks();
  window.addEventListener("resize", updateWidth);
});
</script>

<template>
  <div class="h-screen w-full flex flex-col">

    <div
      v-if="!isWelcomePage"
      class="w-full py-4 flex flex-col items-center bg-layer"
    >
      <div class="desktop:w-[944px] tablet:w-[624px] mobile:w-[424px] flex w-[280px] flex-col justify-center items-center">

        <div class="flex desktop:justify-center tablet:justify-center mobile:justify-center justify-between w-[280px] pb-4">
          <img
            v-if="!isSearching"
            class="w-[55px] h-[41px]"
            src="../../public/logo.svg"
            alt="лого"
          />

          <div
            v-if="screenWidth >= 480 || isSearching"
            class="relative desktop:ml-[25px] tablet:ml-[25px] mobile:ml-[17px]"
          >
            <div class="absolute z-50 inset-y-0 left-0 pl-3 flex items-center">
              <img v-if="screenWidth >= 480" src="../shared/icons/search.svg" />
              <img
                v-if="isSearching"
                class="w-[20px] cursor-pointer"
                src="../shared/icons/xModal.svg"
                @click="isSearching = false"
              />
            </div>

            <input
              v-model="searchQuery"
              class="relative z-0 desktop:w-[864px] tablet:w-[544px] mobile:w-[352px] w-[280px] h-[41px] pl-[36px] text-[14px] leading-6 rounded-lg font-Inter focus-visible:outline focus-visible:outline-green focus-visible:outline-2"
              placeholder="Найти книгу"
            />
          </div>

          <button v-else @click="isSearching = true">
            <img src="../shared/icons/search.svg" />
          </button>
        </div>

        <div class="flex justify-between w-full tablet:items-center">
          <div class="flex">
            <h1>Книги в каталоге</h1>
            <h1 class="ml-2 text-accent">
              {{ bookStore.getBookCount() }}
            </h1>
          </div>

          <div v-if="screenWidth >= 768">
            <div class="min-w-[157px]">
              <AppButton
                :isAdd="true"
                img-name="fileAdd"
                text="Добавить книгу"
                @click="showDialog"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto flex flex-col items-center mt-4 mb-14">
      <router-view />
    </div>

    <div
      v-if="!isWelcomePage && screenWidth < 768"
      class="fixed bottom-2 w-[304px]"
    >
      <AppButton
        :isAdd="true"
        img-name="fileAdd"
        text="Добавить книгу"
        @click="showDialog"
      />
    </div>

    <AppDialog ref="dialogTarget">
      <FormAdd :dialog="dialogTarget" />
    </AppDialog>
  </div>
</template>

<style scoped>
h1 {
  @apply font-semibold text-xl leading-5;
}
</style>