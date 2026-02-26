<template>
  <Header :showIcons="false" />
  <div class="bg-customSlate py-1 mb-4">
    <div class="max-w-3xl mx-auto flex flex-col items-center justify-between p-4 text-white">
      <h2 class="text-2xl text-center">
        A look at how NCCoE Bank demonstrated the use of Mobile Driver's Licenses (mDLs) to improve customer onboarding and enhance security for financial institutions
      </h2>
    </div>
  </div>
  <div class="max-w-6xl mx-auto px-4 py-2 bg-white">
    <p class="mb-4">The videos below are recordings of the architecture built with our technology providers 
      in a cross-device scenario. In the future, we will publish an additional video that addresses a same-device 
      (app to app) identity re-verification scenario.</p>
      
  </div>

  <div class="bg-white">
    <div
        v-for="(item, index) in videoPdfPairs"
        :key="index"
        :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
        class="w-full py-10"
    >
      <div class="max-w-6xl mx-auto px-4 space-y-4">
        <h2 class="text-customSlate text-xl mb-10">{{ item.title }}</h2>
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="flex-1 flex justify-center w-full">
              <!-- Render video player -->
            <div v-if="item.videoSrc" class="w-full max-w-6xl h-[35rem]">
              <video
                  class="w-full h-full"
                  controls
                  :src="item.videoSrc"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <!-- Render Kaltura player -->
            <div v-else-if="item.entryId" :id="'video-' + index" class="w-full max-w-6xl h-[35rem]"></div>
            <!-- Placeholder for "Coming Soon" -->
            <div v-else class="flex items-center justify-center w-full max-w-6xl h-[35rem] bg-gray-200 text-gray-600">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { onMounted } from 'vue';
import { DocumentTextIcon } from '@heroicons/vue/24/outline';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const videoPdfPairs = [
  {
    title: '1. Applying to open a new account, using an mDL as evidence to verify the identity of a new customer.',
    entryId: '1_f7yg7xip',
  },
  {
    title: '2. Setting up online access for a newly opened account, using an mDL to confirm that the user accessing the account is the same user who applied for the account.',
    entryId: '1_jmhso0d0',
  },
  {
    title: '3. Offering an instant approval user journey (where the application is approved and the account is set up in the same session, without requiring the customer to come back in a subsequent session to set up online access).',
    entryId: '1_07kamqe0',
  },
  {
    title: '4. Using an mDL as a step-up verification when the user initiates a high-value transaction or the financial institution’s fraud system flags the transaction as high risk.',
    entryId: '1_4c2ihze7',
  },
];

onMounted(() => {
  videoPdfPairs.forEach((item, index) => {
    if (item.entryId) {
      try {
        const targetId = 'video-' + index;
        const script = document.createElement('script');
        script.src = 'https://cdnapisec.kaltura.com/p/684682/embedPlaykitJs/uiconf_id/55674542';
        script.onload = () => {
          const kalturaPlayer = KalturaPlayer.setup({
            targetId: targetId,
            provider: {
              partnerId: 684682,
              uiConfId: 55674542,
            },
            playback: {
              autoplay: false,
            },
          });
          kalturaPlayer.loadMedia({ entryId: item.entryId });
        };
        document.body.appendChild(script);
      } catch (e) {
        console.error(e.message);
      }
    }
  });
});
</script>
