<template>
  <nav>
    <ul
      class="flex flex-wrap md:flex-no-wrap md:w-full justify-between mb-4 text-sm"
    >
      <NavigationItem id="nav-overview" label="Overview" link="/" exact />
      <NavigationItem
        id="nav-ontrack"
        label="9th Grade On Track"
        link="/ontrack"
      />
      <NavigationItem id="nav-grad" label="Graduation" link="/grad" />
      <NavigationItem id="nav-ffm" label="Matriculation" link="/ffm" />
      <NavigationItem
        id="nav-persistence"
        label="Persistence"
        link="/persistence"
      />
    </ul>
  </nav>
</template>

<script>
import NavigationItem from '~sdp-components/Navigation/NavigationItem'

export default {
  components: {
    NavigationItem,
  },
}
</script>
