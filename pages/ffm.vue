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
            alt="Matriculation Icon"
            src="~/assets/images/matriculation-icon.png"
          />
          <p class="text-xl font-bold">
            Percent of Graduates Enrolled in College
          </p>
          <p class="text-lg font-semibold">District Rate: {{ districtAvg }}</p>
        </div>
        <p>
          Percent of graduates who enroll in a post-secondary institution in the
          first fall after graduation. Students are counted in the year they
          graduate, regardless of whether or not they graduated on time. For
          example, all students who graduated in
          {{ $store.getters.sy_c_all }} are shown in
          {{ $store.getters.sy_c_all }}. Students are broken out into those
          <span class="font-semibold ffm-four"
            >attending four-year institutions</span
          >, those students
          <span class="font-semibold ffm-two"
            >attending two-year institutions</span
          >, and those who
          <span class="font-semibold ffm-no"
            >did not matriculate in the first fall after graduation</span
          >, including those who intended to, but did not enroll
          <span class="font-semibold ffm-melt">(summer melt)</span>.
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
        class="max-w-sm"
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
          @buttonClicked="handleDemoSelection($event.value, $event.label)"
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
          @buttonClicked="handleNumSelected($event.value, $event.label)"
        />
      </div>
      <QdtComponent class="w-full" :load="loadMap" type="QdtViz" :props="map" />
    </Square>
    <Square ref="v-table" name="Table" class="w-full mb-4" color="tint" tight>
      <Heading size="medium"> College Matriculation Detail </Heading>
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
        IEP: 'IEP',
        EL: 'EL',
        EconDisadvantaged: 'Economically Disadvantaged',
      }
    },
    numSelectedMap() {
      return {
        '2, 3': '% Matriculated',
        3: `% Matriculated to 4-Year Institution`,
      }
    },

    // qlik objects
    kpiOverall() {
      return {
        qId: 'wakMk',
        description: `Students who are entering college the first fall after graduating high school`,
        title: '',
        subtitle: ' ',
        secondaryLabel: `From ${this.$store.getters.sy_p}`,
        color: 'light',
      }
    },
    chartDemo() {
      return {
        id: 'DTTpSPM',
        type: 'barchart',
        height: '300px',
      }
    },
    sankey() {
      return {
        id: 'BjMKJzk',
        type: 'qlik-sankey-chart-ext',
        height: '400px',
      }
    },
    map() {
      return {
        id: 'kdDKSf',
        type: 'map',
        height: '600px',
      }
    },
    table() {
      return {
        id: 'HQCa',
        type: 'pivot-table',
        height: '600px',
      }
    },
  },
  async mounted() {
    const districtAvg = await this.$qlik.evaluateVariableValueByName(
      'v_avg_ffm_district_cy'
    )
    this.districtAvg = districtAvg?.qText || 0

    this.demoType = await this.$qlik.getVariableValueByName(
      'v_field_demo_selected'
    )
    this.numSelected = await this.$qlik.getVariableValueByName(
      'v_num_ffm_selected'
    )
  },
  methods: {
    handleDemoSelection(demoType, demoLabel) {
      this.$qlik.setVariableValueByName('v_field_demo_selected', demoType)
      this.backgroundType = demoType
    },
    handleNumSelected(value, label) {
      this.$qlik.setVariableValueByName('v_num_ffm_selected', value)
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
.ffm-four {
  color: #0b315b;
}
.ffm-two {
  color: #ffaa30;
}
.ffm-no {
  color: #ae1c3e;
}
.ffm-melt {
  color: #007bff;
}
</style>
