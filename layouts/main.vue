<template>
  <div>
    <v-tour
      class="text-lg"
      name="mainTour"
      :steps="tourSteps"
      :callbacks="tourCallbacks"
    />
    <div class="container mx-auto px-2 lg:px-6 py-4 md:py-6">
      <Header />
      <Navigation id="main-nav" />
      <Columns>
        <Column side="left" width="1/3">
          <Square color="dark">
            <Heading size="large">
              <span id="main-title"> College & Career </span>
            </Heading>
            <p class="text-xl">For the {{ $store.getters.sy_c }} school year</p>
            <button
              id="main-tour-button"
              class="blink text-blue-800 bg-white px-2 py-1 my-1 text-base font-bold uppercase hover:bg-gray-200 focus:outline-none"
              @click="launchTour"
            >
              Give me a tour
            </button>
          </Square>
          <Square id="main-filter-panel" color="tint" class="sticky top-0">
            <QlikSelectedFilterPills />
            <QlikCollapsableFilterContainer
              id="main-filters"
              :field-values="filterFieldValues"
              :blacklist-fields="['Current School Name']"
              @change="handleSelections"
            />
            <QlikFilter
              id="main-school-filter"
              style="max-height: 400px"
              title="School Name"
              field="Current School Name"
              @change="handleFieldSelections"
            />
          </Square>
        </Column>
        <Column id="main-content-side" side="right" width="2/3">
          <Nuxt />
        </Column>
      </Columns>
    </div>
    <Footer />
  </div>
</template>

<script>
import SelectionsMixin from '~/mixins/SelectionsMixin'
import Header from '~sdp-components/Header/Header'
import Navigation from '~/components/Navigation'
import Footer from '~sdp-components/Footer/Footer'
import Columns from '~sdp-components/PageElements/Columns'
import Column from '~sdp-components/PageElements/Column'
import QlikSelectedFilterPills from '~sdp-components/Qlik/QlikSelectedFilterPills'
import QlikCollapsableFilterContainer from '~sdp-components/Qlik/QlikCollapsableFilterContainer'
import QlikFilter from '~sdp-components/Qlik/QlikFilter'
import Square from '~sdp-components/PageElements/Square'
import Heading from '~sdp-components/PageElements/Heading'

export default {
  components: {
    Header,
    Navigation,
    Footer,
    Columns,
    Column,
    QlikSelectedFilterPills,
    QlikFilter,
    QlikCollapsableFilterContainer,
    Square,
    Heading,
  },
  mixins: [SelectionsMixin],
  data() {
    return {
      tourSteps: [
        {
          target: '#main-title',
          content:
            'Welcome to the College & Career website. Here you can find data about high school students and graduates for both district and public charter schools in Philadelphia.',
          params: { enableScrolling: true },
          offset: -400,
        },
        {
          target: '#nav-grad',
          content:
            'This website is divided into four sections. You can navigate to any of these sections at any time.',
          params: { enableScrolling: false },
        },
        {
          target: '#main-content-side',
          content: 'Here you can view charts, maps, and tables.',
          params: { enableScrolling: true },
          offset: -400,
        },
        {
          target: '#main-filter-panel',
          content:
            'On this panel you can find a number of filters to narrow down the displayed schools and metrics.',
          params: { enableScrolling: true },
          offset: -400,
        },
        {
          target: '#main-filters',
          content:
            'Use the filters to narrow down school or student characteristics.',
          params: { enableScrolling: false },
        },
        {
          target: '#main-school-filter',
          content: 'Use the school filter to choose one or more schools.',
          params: { enableScrolling: false },
        },
        {
          target: '#main-tour-button',
          content: 'Press here to take this tour again.',
          params: { enableScrolling: true },
          offset: -400,
        },
      ],

      tourCallbacks: {
        onSkip: () => this.$store.dispatch('tour/initialize_main'),
        onFinish: () => this.$store.dispatch('tour/initialize_main'),
      },
    }
  },
  computed: {
    filterFieldValues() {
      return [
        { field: 'Sector' },
        { field: 'Current Network', label: 'Network' },
        { field: 'Current AdmissionType', label: 'Admission Type' },
      ]
    },
  },
  mounted() {
    if (!this.$store.state.tour.main_initialized) this.launchTour()
  },
  /**
   * Remove field values that we don't want to carry to other pages
   */
  async destroyed() {
    const fieldsToClear = []
    const engine = await this.$qlik.engine
    let field
    fieldsToClear.forEach(async (fieldName) => {
      field = await engine.getField(fieldName)
      await field.clear()
    })
  },
  methods: {
    launchTour() {
      this.$tours.mainTour.start()
    },
  },
}
</script>
<style lang="postcss" scoped>
.blink {
  animation-name: blink-in;
  animation-duration: 3s;
  animation-delay: 2s;
  animation-timing-function: linear;
}

@keyframes blink-in {
  0% {
    background-color: white;
  }
  10% {
    background-color: #2a4365;
  }
  20% {
    background-color: white;
  }
  30% {
    background-color: #2a4365;
  }
  40% {
    background-color: white;
  }
  50% {
    background-color: #2a4365;
  }
  60% {
    background-color: white;
  }
  70% {
    background-color: #2a4365;
  }
  80% {
    background-color: white;
  }
  90% {
    background-color: #2a4365;
  }
  100% {
    background-color: white;
  }
}
</style>
