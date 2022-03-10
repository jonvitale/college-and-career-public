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
            alt="Graduation Icon"
            src="~/assets/images/graduation-icon.png"
          />
          <p class="text-xl font-bold">
            The percentage of students Graduated On Time
          </p>
          <p class="text-lg font-semibold">District Rate: {{ districtAvg }}</p>
        </div>
        <p>
          The percentage of students who graduate within four years of entering
          high school. Students are counted in their expected year of
          graduation; for example, the {{ $store.getters.sy_c_all }} rate
          describes students who first entered 9th grade in
          {{ $store.getters.sy_p3_all }}. Students are broken out into those who
          <span class="font-semibold grad-high"
            >graduated on time with a GPA above 3.0</span
          >, those who
          <span class="font-semibold grad-low"
            >graduated on time with a GPA below 3.0</span
          >, and those who
          <span class="font-semibold grad-no">did not graduate on time</span>.
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
      <Heading size="medium"> Four-Year Graduation Detail </Heading>
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
      numSelected: '2, 3, 4',
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
        '2, 3, 4': '% Graduated',
        4: `% Graduated, H.S. GPA 3.0 or Better`,
      }
    },

    // qlik objects
    kpiOverall() {
      return {
        qId: 'sTeYS',
        description: `Students who graduated within four years of entering high school. Eligible students were enrolled in 12th grade in the displayed year.`,
        title: '',
        subtitle: ' ',
        secondaryLabel: `From ${this.$store.getters.sy_p}`,
        color: 'light',
      }
    },
    chartDemo() {
      return {
        id: 'Njkwre',
        type: 'barchart',
        height: '300px',
      }
    },
    sankey() {
      return {
        id: 'ECDfxzP',
        type: 'qlik-sankey-chart-ext',
        height: '400px',
        noSelections: true,
      }
    },
    map() {
      return {
        id: 'SmdW',
        type: 'map',
        height: '600px',
      }
    },
    table() {
      return {
        id: 'jdxqLt',
        type: 'pivot-table',
        height: '600px',
      }
    },
  },
  async created() {
    const districtAvg = await this.$qlik.evaluateVariableValueByName(
      'v_avg_graduation_district_cy'
    )
    this.districtAvg = districtAvg?.qText || 0
    this.demoType = await this.$qlik.getVariableValueByName(
      'v_field_demo_selected'
    )
    this.numSelected = await this.$qlik.getVariableValueByName(
      'v_num_graduation_selected'
    )
  },
  methods: {
    handleDemoSelection(demoType, demoLabel) {
      this.$qlik.setVariableValueByName('v_field_demo_selected', demoType)
      this.backgroundType = demoType
    },
    handleNumSelected(value, label) {
      this.$qlik.setVariableValueByName('v_num_graduation_selected', value)
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
.grad-high {
  color: #3c52a1;
}
.grad-low {
  color: #ed875e;
}
.grad-no {
  color: #ae1c3e;
}
</style>
