<template>
  <div class="container">
    <Square class="flex flex-wrap lg:flex-no-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpiNgot"
        class="max-w-sm"
        :q-id="kpiNgot.qId"
        :title="kpiNgot.title"
        :subtitle="kpiNgot.subtitle"
        :secondary-label="kpiNgot.secondaryLabel"
        :description="kpiNgot.description"
        :display-increase-decrease="true"
        primary-size="reactive"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartNgot"
      />
    </Square>
    <Square class="flex flex-wrap lg:flex-no-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpiGrad"
        class="max-w-sm"
        :q-id="kpiGrad.qId"
        :title="kpiGrad.title"
        :subtitle="kpiGrad.subtitle"
        :secondary-label="kpiGrad.secondaryLabel"
        :description="kpiGrad.description"
        :display-increase-decrease="true"
        primary-size="reactive"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartGrad"
      />
    </Square>
    <Square class="flex flex-wrap lg:flex-no-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpiFFM"
        class="max-w-sm"
        :q-id="kpiFFM.qId"
        :title="kpiFFM.title"
        :subtitle="kpiFFM.subtitle"
        :secondary-label="kpiFFM.secondaryLabel"
        :description="kpiFFM.description"
        :display-increase-decrease="true"
        primary-size="reactive"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartFFM"
      />
    </Square>
    <Square class="flex flex-wrap lg:flex-no-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpiPersistence"
        class="max-w-sm"
        :q-id="kpiPersistence.qId"
        :title="kpiPersistence.title"
        :subtitle="kpiPersistence.subtitle"
        :secondary-label="kpiPersistence.secondaryLabel"
        :description="kpiPersistence.description"
        :display-increase-decrease="true"
        primary-size="reactive"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartPersistence"
      />
    </Square>
  </div>
</template>

<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square,
  },
  computed: {
    kpiNgot() {
      return {
        qId: 'NnMKtj',
        description: `Students who are earning the credits needed to advance to 10th grade`,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light',
      }
    },
    chartNgot() {
      return {
        id: 'XgvYyew',
        type: 'linechart',
        height: '300px',
      }
    },
    kpiGrad() {
      return {
        qId: 'sTeYS',
        description: `Students who are graduating within four years of entering high school`,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light',
      }
    },
    chartGrad() {
      return {
        id: 'YXevrrh',
        type: 'linechart',
        height: '300px',
      }
    },
    kpiFFM() {
      return {
        qId: 'wakMk',
        description: `Students who are entering college the first fall after graduating high school`,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light',
      }
    },
    chartFFM() {
      return {
        id: 'LSJxSs',
        type: 'linechart',
        height: '300px',
      }
    },
    kpiPersistence() {
      return {
        qId: 'WACqTM',
        description: `Students who went to college after graduation who are still enrolled the next year`,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light',
      }
    },
    chartPersistence() {
      return {
        id: 'gfhPPvb',
        type: 'linechart',
        height: '300px',
      }
    },
  },
}
</script>
