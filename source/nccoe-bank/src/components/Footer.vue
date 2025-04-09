<template>
    <div class="bg-customSlate py-4 mt-20">

        <nav class="max-w-6xl mx-auto py-2 text-white" aria-label="Footer Navigation">
            <ul class="flex flex-wrap justify-center">
                <li class="hover:underline text-sm my-2 border-l border-white first:border-l-0 px-4" v-for="(item, index) in navItems" :key="index"><a href="#">{{ item.label }}</a></li>
            </ul>
        </nav>


        <div class="max-w-6xl mx-auto text-white py-2 text-center">
            <p class="uppercase py-2 text-sm">Bank, N.A. Member FDIC. Equal Housing Lender</p>
            <p class="uppercase py-2 text-sm"> All Rights Reserved</p>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Footer',
    props: {
        navItems: {
            type: Array,
            default: () => [
                {label: 'Locations'},
                {label: 'Contact Us'},
                {label: 'Help & Support'},
                {label: 'Browse with Specialist'},
                {label: 'Accessible Banking'},
                {label: 'Privacy'},
                {label: 'Security'},
                {label: 'Online Banking Service Agreement'},
                {label: 'Advertising Practices'},
                {label: 'Site Map'},
                {label: 'Careers'},
                {label: 'Share Your Feedback'},
            ]
        }
    }
};
</script>

<script setup>
// import {Link} from '@inertiajs/vue3';
</script>
