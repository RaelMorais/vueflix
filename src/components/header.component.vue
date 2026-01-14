<script setup>
import { ref, onMounted, watch } from "vue"
import { Home, Film, Tv, Settings, User, Search } from "lucide-vue-next"
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isExpanded = ref(false)
const activeItem = ref("home")

const menuItems = [
  { id: "home", label: "Início", icon: Home, path: '/home' },
  { id: "movies", label: "Filmes", icon: Film, path: '/home/films' },
  { id: "series", label: "Séries", icon: Tv , path: '/home/tvshows'},
]

const handleSelect = (id, path) => {
  activeItem.value = id
  if (path) {
    router.push(path)
  }
}

onMounted(() => {
   const path = route.path
   const current = menuItems.find(item => item.path === path)
   
   if (current) {
     activeItem.value = current.id
   } else if (path === '/home/settings') {
     activeItem.value = 'settings'
   }
})

watch(() => route.path, (newPath) => {
  const current = menuItems.find(item => item.path === newPath)
  if (current) activeItem.value = current.id
  if (newPath === '/home/settings') activeItem.value = 'settings'
})
</script>

<template>
  <aside
    class="sidebar"
    :class="{ expanded: isExpanded }"
    @mouseenter="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <div class="sidebar-header">
      <div class="logo-icon">M</div>
      <span class="logo-text">MAX</span>
    </div>

    <nav class="nav-content">
      <a 
        href="#" 
        class="nav-item search-item" 
        :style="{ '--i': 0 }"
        @click.prevent="handleSelect('search')"
      >
        <Search class="icon" />
        <span class="label">Buscar</span>
        <span class="hover-sheen" />
      </a>

      <div class="divider"></div>

      <a
        v-for="(item, idx) in menuItems"
        :key="item.id"
        href="#"
        class="nav-item"
        :class="{ active: activeItem === item.id }"
        :style="{ '--i': idx + 1 }"
        @click.prevent="handleSelect(item.id, item.path)"
      >
        <component :is="item.icon" class="icon" />
        <span class="label">{{ item.label }}</span>
        <div class="active-glow"></div>
        <span class="hover-sheen" />
      </a>
    </nav>

    <div class="sidebar-footer">
      <a
        href="#"
        class="nav-item"
        :class="{ active: activeItem === 'settings' }"
        :style="{ '--i': 5 }"
        @click.prevent="handleSelect('settings', '/home/settings')"
      >
        <Settings class="icon" />
        <span class="label">Configurações</span>
        <div class="active-glow"></div>
        <span class="hover-sheen" />
      </a>

      <div class="profile-item" @click="handleSelect('profile')">
        <div class="avatar">
          <User class="avatar-icon" />
        </div>

        <div class="profile-info">
          <span class="name">Meu Perfil</span>
          <span class="sub-text">Trocar conta</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* O seu CSS permanece idêntico, copiei abaixo para garantir que funcione */
.sidebar {
  --bg: #050505;
  --bg-2: #0b0b0b;
  --hover: rgba(255, 255, 255, 0.085);
  --stroke: rgba(255, 255, 255, 0.06);
  --stroke-2: rgba(255, 255, 255, 0.1);
  --text: #ffffff;
  --muted: #a1a1aa;
  --max-gradient: linear-gradient(135deg, #002be7 0%, #981ceb 100%);
  --glow: rgba(152, 28, 235, 0.55);
  --ease-smooth: cubic-bezier(0.2, 0.9, 0.2, 1);
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --dur: 520ms;
  --dur-fast: 220ms;
}

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  height: 100vh;
  width: 72px;
  padding: 24px 10px;
  background: radial-gradient(1200px 600px at 0% 0%, rgba(152, 28, 235, 0.12), transparent 55%),
    linear-gradient(180deg, #060606 0%, #000000 100%);
  border-right: 1px solid var(--stroke);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 50;
  contain: layout paint;
  will-change: width, box-shadow;
  transition: width var(--dur) var(--ease-soft), box-shadow var(--dur) var(--ease-smooth), background-color var(--dur) var(--ease-smooth);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.sidebar.expanded {
  width: 252px;
  background: linear-gradient(180deg, #0a0a0a 0%, #050505 100%);
  box-shadow: 10px 0 55px rgba(0, 0, 0, 0.75);
}

.sidebar-header {
  display: flex;
  align-items: center;
  height: 48px;
  margin-bottom: 22px;
  padding-left: 8px;
  position: relative;
}

.logo-icon {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: var(--max-gradient);
  display: grid;
  place-items: center;
  font-weight: 900;
  font-size: 16px;
  color: var(--text);
  flex-shrink: 0;
  box-shadow: 0 0 18px rgba(152, 28, 235, 0.22), 0 0 38px rgba(0, 43, 231, 0.08);
  transform: translateZ(0);
  transition: transform var(--dur-fast) var(--ease-smooth);
}

.sidebar:hover .logo-icon {
  transform: scale(1.04);
}

.logo-text {
  position: absolute;
  left: 56px;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 1px;
  color: var(--text);
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 260ms var(--ease-smooth), transform 380ms var(--ease-soft);
  pointer-events: none;
}

.sidebar.expanded .logo-text {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 80ms;
}

.nav-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.09), transparent);
  margin: 12px 0;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  height: 46px;
  padding: 0 12px;
  border-radius: 14px;
  text-decoration: none;
  color: color-mix(in oklab, var(--muted) 92%, white 8%);
  overflow: hidden;
  transition: background-color var(--dur-fast) ease, color var(--dur-fast) ease, transform var(--dur-fast) var(--ease-smooth);
}

.nav-item:hover {
  background-color: var(--hover);
  color: var(--text);
  transform: translateY(-1px);
}

.nav-item:active {
  transform: translateY(0px);
}

.nav-item.active {
  color: var(--text);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, transparent 80%);
}

.hover-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
  transform: translateX(-120%);
  opacity: 0;
  transition: transform 520ms var(--ease-soft), opacity 240ms ease;
  pointer-events: none;
}

.nav-item:hover .hover-sheen {
  opacity: 1;
  transform: translateX(120%);
}

.icon {
  width: 22px;
  height: 22px;
  min-width: 22px;
  transition: filter 260ms ease, transform 260ms var(--ease-smooth);
}

.nav-item:hover .icon {
  transform: scale(1.03);
}

.nav-item.active .icon {
  filter: drop-shadow(0 0 10px rgba(152, 28, 235, 0.35));
}

.label {
  margin-left: 14px;
  font-size: 14px;
  font-weight: 520;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-12px);
  transition: opacity 220ms ease, transform 420ms var(--ease-soft);
}

.sidebar.expanded .label {
  opacity: 1;
  transform: translateX(0);
  transition-delay: calc(70ms + (var(--i) * 35ms));
}

.active-glow {
  position: absolute;
  left: 0;
  top: 12%;
  height: 76%;
  width: 3px;
  border-radius: 0 6px 6px 0;
  background: var(--max-gradient);
  box-shadow: 3px 0 14px var(--glow);
  opacity: 0;
  transform: scaleY(0.65);
  transition: opacity 220ms ease, transform 420ms var(--ease-soft);
}

.nav-item.active .active-glow {
  opacity: 1;
  transform: scaleY(1);
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 18px;
  border-top: 1px solid var(--stroke);
}

.profile-item {
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 999px;
  cursor: pointer;
  height: 50px;
  transition: background-color var(--dur-fast) ease, transform var(--dur-fast) var(--ease-smooth);
}

.profile-item:hover {
  background-color: var(--hover);
  transform: translateY(-1px);
}

.profile-item:active {
  transform: translateY(0px);
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border: 1px solid transparent;
  transition: border-color 260ms ease, transform 260ms var(--ease-smooth), box-shadow 260ms ease;
  margin-left: 2px;
}

.profile-item:hover .avatar {
  border-color: rgba(152, 28, 235, 0.55);
  box-shadow: 0 0 0 6px rgba(152, 28, 235, 0.08);
  transform: scale(1.04);
}

.avatar-icon {
  width: 16px;
  color: rgba(255, 255, 255, 0.85);
  opacity: 0.85;
}

.profile-info {
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 220ms ease, transform 420ms var(--ease-soft);
}

.sidebar.expanded .profile-info {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 170ms;
}

.name {
  color: var(--text);
  font-size: 13px;
  font-weight: 650;
  line-height: 1.2;
}

.sub-text {
  color: rgba(255, 255, 255, 0.45);
  font-size: 11px;
}

@media (prefers-reduced-motion: reduce) {
  .sidebar, .nav-item, .label, .logo-text, .active-glow, .hover-sheen, .profile-item, .avatar, .profile-info {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }
}
</style>