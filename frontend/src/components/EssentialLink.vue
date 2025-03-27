<template>
  <q-item
    clickable
    v-ripple
    :active="routeName == cRouterName"
    active-class="bg-blue-1 text-grey-8 text-bold menu-link-active-item-top"
    @click=" () => !(routeName == cRouterName) ? $router.push({ name: routeName }) : ''"
    class="menu-item"
    :class="{'text-negative text-bolder': color === 'negative'}"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon
        :name="color === 'negative' ? 'mdi-cellphone-nfc-off' : icon"
        :class="[iconColor ? `text-${iconColor}` : '', 'menu-icon']"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  data () {
    return {
      menuAtivo: 'dashboard'
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: ''
    },

    routeName: {
      type: String,
      default: 'dashboard'
    },

    icon: {
      type: String,
      default: ''
    },

    iconColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    cRouterName () {
      return this.$route.name
    }
  }
}
</script>
<style lang="sass">
.menu-link-active-item-top
  border-left: 3px solid rgb(21, 120, 173)
  border-right: 3px solid rgb(21, 120, 173)
  border-top-right-radius: 20px
  border-bottom-right-radius: 20px
  position: relative
  height: 100%

.menu-item
  transition: all 0.3s ease
  margin-bottom: 8px
  &:hover
    background: rgba(0, 0, 0, 0.05)
    transform: translateX(5px)
    .menu-icon
      transform: scale(1.2)
      transition: transform 0.3s ease

.menu-icon
  transition: all 0.3s ease
  font-size: 24px

/* Adiciona espaço extra no último item do menu */
.menu-item:last-child
  margin-bottom: 60px
</style>
