<template>
  <Header :showIcons="false" />
  <div class="bg-customSlate py-1 mb-4">
    <div class="max-w-3xl mx-auto flex flex-col items-center justify-between p-4 text-white">
      <h2 class="text-2xl text-center">
        A look at how NCCoE Bank envisions the use of mobile driver’s licenses (mDLs) to improve customer onboarding and enhance security for financial institutions
      </h2>
    </div>
  </div>
  <div class="max-w-6xl mx-auto px-4 py-2 bg-white">
    <p class="mb-4">What follows are four sample user journey videos that demonstrate how
      mDLs could augment current online experiences at financial
      institutions:</p>
    <ol class="list-decimal mb-4 mx-8">
      <li><p>Applying to open a new account, using an mDL as evidence to
        verify the identity of a new customer.</p></li>
      <li><p>Setting up online access for a newly opened account, using an mDL
        to confirm that the user accessing the account is the same user who
        applied for the account.</p></li>
      <li><p>Offering an instant approval user journey (where the application
        is approved and the account is set up in the same session, without
        requiring the customer to come back in a subsequent session to set up
        online access).</p></li>
      <li><p>Using an mDL as a step-up verification when the user initiates a
        high-value transaction or the financial institution’s fraud system flags
        the transaction as high risk.</p></li>
    </ol>
    <p class="mb-4">
      The videos and flows have been implemented as wireframes to provide a
      visual representation of a customer navigating the NCCoE Bank site,
      step-by-step, in a browser on a laptop or desktop device. The NCCoE
      project team is currently building out a working demonstrating of these
      wireframes using commercially available standards and technology. If you
      would like to receive updates on this effort, please <a
        class="text-blue-600 hover:underline" target="_blank" href="https://www.nccoe.nist.gov/projects/digital-identities-mdl">join
      our community of interest.</a>
    </p>
    <p class="mb-4">If you would like to click on any links you see in the video please access the corresponding PDF files.</p>
  </div>

  <div class="bg-white">
    <div
        v-for="(item, index) in videoPdfPairs"
        :key="index"
        :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
        class="w-full py-10"
    >
      <div class="max-w-6xl mx-auto px-4 space-y-4">
        <h2 class="text-customSlate text-2xl mb-10 text-center">{{ item.title }}</h2>
        <div class="flex flex-col items-center justify-center space-y-4">
          <div class="flex-1 flex justify-center w-full">
            <div v-if="item.entryId" :id="'video-' + index" class="w-full max-w-6xl h-[35rem]"></div>
            <div v-else class="flex items-center justify-center w-full max-w-6xl h-[35rem] bg-gray-200 text-gray-600">
              Coming Soon
            </div>
          </div>
          <div class="flex-1 flex justify-center w-full max-w-6xl">
            <div class="h-20 w-full flex items-center justify-center border border-gray-300 rounded-lg bg-white shadow-md">
              <div v-if="item.pdf" class="h-20 w-full flex items-center justify-center border border-gray-300 rounded-lg bg-white shadow-md">
                <a :href="item.pdf" target="_blank" class="text-customSlate hover:underline flex items-center space-x-2">
                  <DocumentTextIcon class="w-6 h-6 text-customSlate" />
                  <span>Step-by-step PDF</span>
                </a>
              </div>
              <div v-else class="h-20 w-full flex items-center justify-center border border-gray-300 rounded-lg bg-white shadow-md text-gray-600">
                Coming Soon
              </div>
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
    title: 'Applying for an Account',
    entryId: '1_ypxray78',
    pdf: new URL('../assets/applying-for-an-account.pdf', import.meta.url).href,
  },
  {
    title: 'Setting up online access after an application is approved (enrollment)',
    entryId: '1_iwupvtl9',
    pdf: new URL('../assets/setting-up-online-access.pdf', import.meta.url).href,
  },
  {
    title: 'Instant approval (when CIP/KYC is fast tracked)',
    entryId: '1_v50tfpjs',
    pdf: new URL('../assets/instant-approval.pdf', import.meta.url).href,
  },
  {
    title: 'Preventing unauthorized high-risk transactions',
    entryId: null,
    pdf: null,
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
