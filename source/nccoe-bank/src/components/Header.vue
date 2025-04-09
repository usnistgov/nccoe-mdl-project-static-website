<template>
    <header
        class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-4 bg-white">
        <div class="logo mb-4 md:mb-0">
            <!-- Logo -->
            <h1 class="text-2xl text-customSlate"><a href="/">NCCoE Bank</a></h1>
            <span class="text-gray-600">(Not a real bank. For demo purposes only)</span>
        </div>
        <nav
            class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <a v-for="(item, index) in navItems" :key="index" :href="item.href"
                  class="text-customSlate hover:underline flex items-center">
                <component v-if="item.icon" :is="item.icon" class="size-6 text-customSlate hover:text-sky-900 mr-2"/>
                {{ item.label }}
            </a>
        </nav>
        <div v-if="showIcons" class="flex items-center space-x-4">
            <a href="#">
                <MagnifyingGlassIcon class="size-6 text-customSlate hover:text-sky-900"/>
            </a>
            <a href="#">
                <QuestionMarkCircleIcon class="size-6 text-customSlate hover:text-sky-900"/>
            </a>
            <a href="#">
                <UserCircleIcon class="size-6 text-customSlate hover:text-sky-900"/>
            </a>
            <a href="/login" class="bg-amber-200 text-black text-sm px-1 py-1 hover:underline">
                Sign In
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        navItems: {
            type: Array,
            default: () => [
                {icon: LockClosedIcon, label: 'Secure Page', href: '#'},
                {label: 'Help', href: '#'},
            ]
        },
        showIcons: {
            type: Boolean,
            default: true
        }
    },
};
</script>


<script setup>
// import {Link} from '@inertiajs/vue3';
import {MagnifyingGlassIcon, QuestionMarkCircleIcon, UserCircleIcon, LockClosedIcon} from '@heroicons/vue/24/outline'
</script>
