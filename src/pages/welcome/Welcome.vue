<script setup lang="ts">
import AppButton from "@/shared/ui/AppButton.vue";

const continueToApp = () => {
  localStorage.setItem('visited', 'true');
  window.location.href = '/';
};

const continueToApp = () => {
  if ((window as any).ym) {
    (window as any).ym(108437493, 'reachGoal', 'welcome_page_continue');
  }
  localStorage.setItem('visited', 'true');
  window.location.href = '/';
};

</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-center bg-white">
    <h1 class="text-2xl mb-4">Добро пожаловать в «Мои книги»!</h1>
    <p class="mb-6 text-center">Здесь вы можете:</p>
    <ul class="list-disc list-inside mb-8">
      <li>Просматривать список книг</li>
      <li>Искать книги по названию</li>
      <li>Добавлять новые книги</li>
      <li>Редактировать и удалять книги</li>
    </ul>
    <AppButton :isAdd="true" text="Начать работу" @btn-click="continueToApp" />
  </div>
</template>
