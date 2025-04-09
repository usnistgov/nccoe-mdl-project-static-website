<script setup>
import {ref, watch} from 'vue'
import Accordion from '../components/Accordion.vue'

const allOpen = ref(false)
const faqs = ref([
  {
    title: "What’s an mDL?",
    content: `
      <p class="mb-4">A <strong>Mobile Driver’s License (mDL)</strong> is a digital version
of your physical driver’s license that’s stored securely on your phone.
It’s issued by your state’s DMV and contains the same information as
your physical driver’s license. An mDL gives you the option to prove
your identity without handing over your physical ID and may be more
convenient when presenting your driver’s license for online
transactions. As of February 2025, the Transportation Security
Administration (TSA) accepts mobile driver's licenses at 27 U.S.
airports for security check-in. Businesses are now beginning to accept
mDLs online to modernize identity verification in a way that benefits
both consumers and businesses.</p>
  <p class="mb-4">With an mDL, you can:</p>
  <ul class="list-disc mx-8 mb-4">
    <li><p><strong>Verify your identity instantly online</strong> without
    scanning or uploading documents.</p></li>
    <li><p><strong>Share only the information needed</strong> instead of
    handing over your full ID.</p></li>
    <li><p><strong>Keep your data more secure</strong> with encryption and
    biometric protection.</p></li>
  </ul>
  <p class="mb-4">To see if your state of residence offers mDLs, please visit the <a
    class="text-blue-600 hover:underline" target="_blank" href="https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap">Jurisdiction
    Data Maps - American Association of Motor Vehicle Administrators -
    AAMVA</a>.</p>
    <p class="mb-4">The Bank of NCCoE accepts mDLs to make it easier and safer to prove
    who you are and to ensure only authorized actions are made using your
    financial account.</p>
    `,
    active: false,
  },
  {
    title: "Why use an mDL?",
    content: `
      <ul class="list-disc mx-8 mb-4">
        <li><p><strong>Faster Application</strong> – Skip steps like taking ID
        photos or visiting a branch.</p></li>
        <li><p><strong>More Secure</strong> – Share only the information needed;
        no more handing over your entire ID.</p></li>
        <li><p><strong>Easy Login</strong> – Once your account is set up, use
        your mDL to create a passkey and log in securely.</p></li>
      </ul>
    `,
    active: false,
  },
  {
    title: "Do I need an mDL to apply for an account?",
    content: `
    <p class="mb-4">No, you can still use a regular driver’s license. But with an mDL,
you can save time and skip extra steps.</p>
    `,
    active: false,
  },
  {
    title: "I have a regular driver’s license, won’t that work?",
    content: `
      <p class="mb-4">Yes! But without an mDL, you may need to upload photos or visit a
branch to verify your identity.</p>
    `,
    active: false,
  },
  {
    title: "Why do I need to verify my identity?",
    content: `
      <p class="mb-4">To meet government regulations, financial institutions (FIs) such as
banks are required to obtain, verify, and record information about each
person applying to open a financial account:</p>
<ul class="list-disc mx-8 mb-4">
<li><p>FIs can only open accounts for U.S. residents. FIs must verify a
U.S. residential street address to accept an application. A U.S.
passport or a physical or mobile driver’s license can be used as proof
to verify this information.</p></li>
<li><p>FIs are required to verify the applicant’s social security
number.</p></li>
</ul>
    `,
    active: false,
  },
  {
    title: "How do I get an mDL?",
    content: `
      <p class="mb-4">If your state offers mDLs, you can request one through your state’s
DMV or licensing agency. To find out if your state issues mDLs, see <a
class="text-blue-600 hover:underline" target="_blank" href="https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap">https://www.aamva.org/jurisdiction-data-maps#anchorformdlmap</a>
      </p>
    `,
    active: false,
  },
  {
    title: "Are you going to share any information about me with the DMV?",
    content: `
      <p class="mb-4">Your state DMV will not receive, nor will they have visibility on any
financial transaction. FIs will contact the DMV only in case of
suspected fraud.</p>
    `,
    active: false,
  },
  {
    title: "How do mDLs protect my privacy?",
    content: `
      <p class="mb-4">When you open a bank account with an mDL, you only share the
information required—nothing more. Unlike a physical ID, which exposes
height, weight, and other personal details, presenting an mDL allows for
only the minimum required information to be shared. This reduces the
risk of data exposure and gives you more control over your personal
information. mDLs also use secure encryption and digital authentication
to prevent unauthorized access or tampering, making them safer than
images or copies of traditional IDs.</p>
    `,
    active: false,
  },
  {
    title: "How do I keep my mDL secure?",
    content: `
      <p class="mb-4">Just like your physical ID, your <strong>mDL needs
protection</strong>—but good digital security makes it even safer.
Follow these best practices:</p>
      <ul class="list-disc mx-8 mb-4">
        <li><p><strong>We</strong> recommend the use of biometrics like a Face
        Id or fingerprint to lock your device instead of just a
        passcode.</p></li>
        <li><p><strong>Keep your phone’s software up to date</strong> to protect
        against security threats.</p></li>
        <li><p><strong>Only share your mDL with trusted apps and
        services</strong>. Carefully examine all consent screen alerts and the
        information about sites where you are presenting mDLs.</p></li>
      </ul>
      <p class="mb-4">By taking these steps, you’re making sure your mDL remains secure and
        accessible only to you.</p>
    `,
    active: false,
  },
  {
    title: "What happens to my mDL if my device is lost or stolen?",
    content: `
      <p class="mb-4">Losing your phone is stressful. It turns out that you have more
control over a lost mDL than a lost physical driver’s license. Here’s
what you can do:</p>
      <ul class="list-disc mx-8 mb-4">
        <li><p><strong>Use “Find My Device”</strong> (Apple or Android) to
        locate or remotely erase your phone.</p></li>
        <li><p><strong>Contact your mobile carrier</strong> to disable your
        phone and block unauthorized access.</p></li>
        <li><p><strong>Notify your bank</strong> if you used your mDL to open an
        account. They can monitor for suspicious activity and help you re-verify
        your identity if needed.</p></li>
        <li><p><strong>Report the loss to your state’s licensing
        agency</strong>. Some DMVs allow remote deactivation of an mDL.</p></li>
        <li><p><strong>File a police report</strong> if your phone was stolen.
        Some carriers require this for device replacement.</p></li>
      </ul>
      <p class="mb-4">Since your mDL is protected by your phone’s security features (such
      as passcodes or biometric authentication), it cannot be accessed without
      your credentials.</p>
    `,
    active: false,
  },
  {
    title: "What if my mDL doesn't work during verification?",
    content: `
      <p class="mb-4">If your mDL isn’t working, try these steps:</p>
      <ul class="list-disc mx-8 mb-4">
        <li><p>Check that your mDL is valid and not expired.</p></li>
        <li><p>Verify that your phone has an active internet
        connection.</p></li>
        <li><p>Restart your phone and try again.</p></li>
      </ul>
      <p class="mb-4">If issues persist, you can still use your physical driver’s license
to complete your application or visit us at one of our NCCoE branch
offices.</p>
    `,
    active: false,
  },
  {
    title: "Can I use my mDL for other banking services beyond opening an account?",
    content: `
      <p class="mb-4">While using an mDL to open an account is a great start, its benefits
don’t stop there. The NCCoE Bank is exploring ways to integrate mDLs
into other financial services, such as:</p>
      <ul class="list-disc mx-8 mb-4">
        <li><p><strong>Applying for loans</strong> – Quickly verify your
        identity for credit applications without uploading documents.</p></li>
        <li><p><strong>Approving high-value transactions</strong> – During
        high-value transactions, mDLs can be a quick and convenient way for you
        to confirm your identity and approve high-value transactions, protecting
        against account misuse or fraud.</p></li>
      </ul>
    `,
    active: false,
  },
  {
    title: "Do I need an internet connection to use my mDL?",
    content: `
      <p class="mb-4">If you are applying remotely, an internet connection is required. If
you are applying in person, you can still use your mDL even if your
phone does not have internet access at the time of application.</p>
    `,
    active: false,
  },
  {
    title: "Can someone copy or steal my mDL?",
    content: `
      <p class="mb-4">mDLs are protected with encryption and biometric security, making
them far more secure than physical IDs. Others wouldn’t be able to use
it without your phone’s passcode or biometric authentication (such as
Face ID or fingerprint recognition).</p>
    `,
    active: false,
  },
  {
    title: "How do I update my mDL if I change my name or address?",
    content: `
      <p class="mb-4">Since the NCCoE Bank relies on the name and address on your mDL, it’s
important to keep it up to date. If you change your name or move to a
new address, contact your state’s DMV to update your information and
then contact the bank to let them know your information has changed.</p>
    `,
    active: false,
  },
  {
    title: "Does an mDL expire like a physical driver’s license?",
    content: `
      <p class="mb-4">Yes, an mDL expires just like your physical driver’s license. You
cannot use an expired mDL to apply for an account.</p>
      <p class="mb-4">Please contact your DMV to renew your mDL when necessary.</p>
    `,
    active: false,
  },
  {
    title: "What is a digital wallet, and how does it relate to an mDL?",
    content: `
      <p class="mb-4">A digital wallet is a secure app on your smartphone that stores and
manages digital versions of cards and credentials, such as credit cards,
boarding passes, and mDLs.</p>
      <p class="mb-4">When you hear about mDLs and digital wallets together, it’s because
an mDL needs a secure place to be stored and accessed, and that’s where
a digital wallet comes in. Just like you might keep a credit card in
Apple Wallet, Google Wallet, or Samsung Wallet, some states issue mDLs
that can be stored in these or state-specific wallet apps.</p>
    `,
    active: false,
  },
  {
    title: "Why do I need a digital wallet for an mDL?",
    content: `
      <p class="mb-4">Digital wallets help ensure that your mDL is protected and easy to
use:</p>
      <ul class="list-disc mx-8 mb-4">
        <li><p><strong>Secure storage</strong> – Your mDL is encrypted and only
        accessible with your phone’s passcode, Face ID, or fingerprint.</p></li>
        <li><p><strong>Quick access</strong> – Easily retrieve your mDL when
        needed, whether verifying your identity online or in person.</p></li>
        <li><p><strong>Selective information sharing</strong> – Unlike handing
        over a plastic ID, digital wallets allow you to share only the necessary
        details (e.g., your full address, but not your height or
        weight).</p></li>
      </ul>
      <p class="mb-4">Not all digital wallets currently support mDLs, and availability
depends on your state and the wallet provider. Check with your DMV to
see which options are available in your area.</p>
    `,
    active: false,
  }
])

const toggleAll = () => {
  allOpen.value = !allOpen.value
  faqs.value.forEach(faq => {
    faq.active = allOpen.value
  })
}
</script>
<template>
  <div class="bg-white">
    <Header :showIcons="false"/>

    <div class="bg-customSlate py-1 mb-4">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 text-white">
        <h2 class="text-2xl">Using Your Mobile Driver’s License at NCCoE Bank</h2>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-2">
      <p class="mb-4">Think about the last time you had to prove who you were. Maybe you
        applied for a bank account, rented a car, or picked up a package that
        required ID. In each case, you likely handed over your driver’s license,
        letting someone see not just your name, but also your address, date of
        birth, weight, and other details that may not have been necessary for
        the transaction.</p>
      <p class="mb-4">Now imagine a more secure and privacy-focused way to verify your
        identity, where you share only what’s required and keep the rest of your
        personal information private. That’s exactly what a Mobile Driver’s
        License (mDL) allows you to do.</p>
      <h2 class="text-customSlate text-3xl my-5 text-center">FAQs</h2>
    </div>
    <div class="max-w-6xl mx-auto px-4 py-2 text-right">
      <button @click="toggleAll"
              class="text-customSlate hover:underline">
        {{ allOpen ? 'Collapse All' : 'Expand All' }}
      </button>
    </div>
    <template v-for="(faq, index) in faqs" :key="index">
      <Accordion :title="faq.title" :id="`faqs-${index}`" :active="faq.active">
        <template #default>
          <div class="py-10 px-5" v-html="faq.content"></div>
        </template>
      </Accordion>
    </template>
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'FAQ',
  components: {
    Header,
    Footer,
  },
};
</script>

