<template>
  <div class="container">
    <ScrollSpyNav
      class="sticky top-0 bg-white"
      title="Sections:"
      :refs="['v-demo', 'v-sankey', 'v-map', 'v-table']"
      orientation="row"
      @nextorlastsectionchange="handleNextSection"
    />
    <Square color="white">
      <div class="text-base text-left">
        <div class="flex flex-col items-center">
          <img
            style="width: 64px"
            alt="Ninth Grade On Track Icon"
            src="~/assets/images/ontrack-icon.png"
          />
          <p class="text-xl font-bold">Percent of Ninth Graders On Track</p>
          <p class="text-lg font-semibold">District Rate: {{ districtAvg }}</p>
        </div>
        <p>
          Percent of 9th graders who finished the year with at least one credit
          in each of the four core subjects (English, mathematics, science, and
          social studies), and at least five credits total. Students are broken
          out into those who finished the year with all
          <span class="font-semibold ontrack"
            >A’s and B’s in the core subjects</span
          >, those who finished with
          <span class="font-semibold atrisk"
            >at least one C or D in the core subjects</span
          >, and those who were
          <span class="font-semibold offtrack"
            >off track because they did not earn all necessary credits</span
          >. Note: College Persistence data is not available for Charter or
          Alternative schools in {{ $store.getters.sy_c_all }}.
        </p>

        <p></p>
      </div>
    </Square>
    <Square
      ref="v-demo"
      name="Demographics"
      class="flex flex-col items-center mb-4"
      color="light"
      tight
    >
      <QlikKPI
        ref="kpiOverall"
        class="max-w-lg"
        :q-id="kpiOverall.qId"
        :title="kpiOverall.title"
        :subtitle="kpiOverall.subtitle"
        :secondary-label="kpiOverall.secondaryLabel"
        :description="kpiOverall.description"
        :display-increase-decrease="true"
        primary-size="small"
      />
      <div class="w-full flex justify-start bg-white pl-2">
        <ButtonGroup
          :options="demoTypeMap"
          :selected-value="demoType"
          label="Demographic category"
          @click="handleDemoSelection($event.value, $event.label)"
        />
      </div>
      <QdtComponent
        class="w-full mx-2 p-2 bg-white"
        type="QdtViz"
        :props="chartDemo"
      />
    </Square>
    <Square ref="v-sankey" name="Flow Diagram" color="tint">
      <QdtComponent
        id="chart-alt-axis"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="sankey"
      />
    </Square>
    <Square ref="v-map" name="Map" class="w-full mb-4" color="dark">
      <Heading size="medium">
        {{ numSelectedMap[numSelected] }} by School and HS Catchment
      </Heading>
      <div class="w-full flex justify-center bg-white mt-3 pl-2">
        <ButtonGroup
          :options="numSelectedMap"
          :selected-value="numSelected"
          @click="handleNumSelected($event.value, $event.label)"
        />
      </div>
      <QdtComponent class="w-full" :load="loadMap" type="QdtViz" :props="map" />
    </Square>
    <Square ref="v-table" name="Table" class="w-full mb-4" color="tint" tight>
      <Heading size="medium"> Ninth Grade On Track Detail </Heading>
      <QdtComponent
        class="w-full mt-2"
        :load="loadTable"
        type="QdtViz"
        :props="table"
      />
    </Square>
  </div>
</template>

<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'
import Heading from '~sdp-components/PageElements/Heading'
import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'
import ScrollSpyNav from '~sdp-components/Navigation/ScrollSpyNav'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square,
    Heading,
    ButtonGroup,
    ScrollSpyNav,
  },
  data() {
    return {
      demoType: 'Ethnicity',
      districtAvg: 0,
      numSelected: '2, 3',
      loadMap: false,
      loadTable: false,
    }
  },
  computed: {
    demoTypeMap() {
      return {
        Ethnicity: 'Ethnicity',
        Gender: 'Gender',
        SPED: 'IEP',
        ELStatus: 'EL',
        EconDisadvantagedStatus: 'Economically Disadvantaged',
      }
    },
    numSelectedMap() {
      return {
        '2, 3': '% On Track',
        3: `% On Track with A's and B's`,
      }
    },

    // qlik objects
    kpiOverall() {
      return {
        qId: 'NnMKtj',
        description: `Students who earned at least one credit
          in each of four core subjects and at least five credits total. Eligible students were enrolled in 9th grade in the displayed year.`,
        title: '',
        subtitle: ' ',
        secondaryLabel: `From ${this.$store.getters.sy_p}`,
        color: 'light',
      }
    },
    chartDemo() {
      return {
        id: 'fpHxWrU',
        type: 'barchart',
        height: '300px',
      }
    },
    sankey() {
      return {
        id: 'FBvXuh',
        type: 'qlik-sankey-chart-ext',
        height: '400px',
        noSelections: true,
      }
    },
    map() {
      return {
        id: 'pJgrgJ',
        type: 'map',
        height: '600px',
      }
    },
    table() {
      return {
        id: 'LkJxymc',
        type: 'pivot-table',
        height: '600px',
      }
    },
  },
  async created() {
    const districtAvg = await this.$qlik.evaluateVariableValueByName(
      'v_avg_9got_district_cy'
    )
    this.districtAvg = districtAvg?.qText || 0
    this.demoType = await this.$qlik.getVariableValueByName(
      'v_field_demo_selected'
    )
    this.numSelected = await this.$qlik.getVariableValueByName(
      'v_num_9got_selected'
    )
  },
  methods: {
    handleDemoSelection(demoType, demoLabel) {
      this.$qlik.setVariableValueByName('v_field_demo_selected', demoType)
      this.backgroundType = demoType
    },
    handleNumSelected(value, label) {
      this.$qlik.setVariableValueByName('v_num_9got_selected', value)
      this.numSelected = value
    },

    handleNextSection(value) {
      if (value === 'v-map') {
        this.loadMap = true
      } else if (value === 'v-table') {
        this.loadMap = true
        this.loadTable = true
      }
    },
  },
}
</script>
<style lang="postcss">
.ontrack {
  color: #47aad8;
}
.atrisk {
  color: #ffaa30;
}
.offtrack {
  color: #ae1c3e;
}
</style>
