<template>
  <div>
    <div class="mx-8">
      <div ref="v-summary" name="Summary" color="tint">
        <h1>Summary</h1>
        <p>
          The College & Career website provides visualization of city-wide
          metrics calculated for the annual School Progress Report (SPR). The
          metrics presented on this page represent important benchmarks of high
          school performance, developed in collaboration with the University of
          Chicago's
          <a href="https://toandthrough.uchicago.edu/" target="_blank">
            To & Through Project</a
          >.
        </p>
        <ul>
          <li>
            <span class="font-semibold">Data Refresh:</span> Annually,
            January/February
          </li>
          <li>
            <span class="font-semibold">Data Attribution:</span> Attribution
            rules differ by metric. All attribution rules are available on the
            SPR Helpful Resources web-page in the SPR User Guide and SPR
            Business Rules. See the
            <a
              href="https://www.philasd.org/performance/programsservices/school-progress-reports/"
              target="_blank"
            >
              District Peformance Office, School Progress Reports
            </a>
            website details.
          </li>
          <li>
            <span class="font-semibold">School Sectors Included:</span> District
            and Charter (not including virtual charters)
          </li>
          <li>
            <span class="font-semibold">School Years Included:</span> SY 2012-13
            to SY {{ $store.getters.sy_c }}
          </li>
        </ul>
        <div class="section-break" />
      </div>
      <div ref="v-metrics" name="Metrics">
        <h1>Metrics</h1>
        <h2>Ninth Grade On Track</h2>
        <p>
          Percent of 9th graders who finished the year with at least one credit
          in each of the four core subjects (English, mathematics, science, and
          social studies), and at least five credits total. Students are broken
          out into those who finished the year:
        </p>
        <ul>
          <li style="list-style-type: square" class="ontrack">
            <span class="px-1 text-black">
              with A’s and B’s in the core subjects
            </span>
          </li>
          <li style="list-style-type: square" class="atrisk">
            <span class="px-1 text-black">
              with at least one C or D in the core subjects
            </span>
          </li>
          <li style="list-style-type: square" class="offtrack">
            <span class="px-1 text-black">
              off track because they did not earn all necessary credits
            </span>
          </li>
        </ul>
        <h2>Four-Year Graduation</h2>
        <p>
          The percentage of students who graduate within four years of entering
          high school. Students are counted in their expected year of
          graduation; for example, the {{ $store.getters.sy_c_all }} rate
          describes students who first entered 9th grade in
          {{ $store.getters.sy_p3_all }}. Students are broken out into those
          who:
        </p>
        <ul>
          <li style="list-style-type: square" class="grad-high">
            <span class="px-1 text-black">
              graduated on time with a GPA above 3.0
            </span>
          </li>
          <li style="list-style-type: square" class="grad-low">
            <span class="px-1 text-black">
              graduated on time with a GPA below 3.0
            </span>
          </li>
          <li style="list-style-type: square" class="grad-no">
            <span class="px-1 text-black"> did not graduate on time </span>
          </li>
        </ul>
        <h2>College Matriculation</h2>
        <p>
          Percent of graduates who enroll in a post-secondary institution in the
          first fall after graduation. Students are counted in the year they
          graduate, regardless of whether or not they graduated on time. For
          example, all students who graduated in
          {{ $store.getters.sy_c_all }} are shown in
          {{ $store.getters.sy_c_all }}. Students are broken out into those:
        </p>
        <ul>
          <li style="list-style-type: square" class="ffm-four">
            <span class="px-1 text-black">
              attending four-year institutions
            </span>
          </li>
          <li style="list-style-type: square" class="ffm-two">
            <span class="px-1 text-black">
              attending two-year institutions
            </span>
          </li>
          <li style="list-style-type: square" class="ffm-no">
            <span class="px-1 text-black">
              did not matriculate in the first fall after graduation, including
              those who intended to, but did not enroll (summer melt)
            </span>
          </li>
        </ul>
        <h2>College Persistence</h2>
        <p>
          Percent of first-fall matriculants who were still enrolled in a
          post-secondary institution in the second fall after graduating high
          school. Students are counted in the year after they graduate high
          school, regardless of whether or not they graduated on time. For
          example, students who graduated in {{ $store.getters.sy_p_all }} are
          shown in {{ $store.getters.sy_c_all }}. Students are broken out into
          those:
        </p>
        <ul>
          <li style="list-style-type: square" class="persistence-four">
            <span class="px-1 text-black">
              attending four-year institutions
            </span>
          </li>
          <li style="list-style-type: square" class="persistence-two">
            <span class="px-1 text-black">
              attending two-year institutions
            </span>
          </li>
          <li style="list-style-type: square" class="persistence-no">
            <span class="px-1 text-black">
              no longer attending a post-secondary institution
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
a {
  @apply underline text-blue-500;
}

h1 {
  font-size: 20pt;
  font-weight: bold;
}

h2 {
  font-size: 18pt;
  font-weight: bold;
}

p,
ul {
  font-size: 13pt;
  padding-bottom: 1rem;
  list-style-type: circle;
}
li {
  margin-left: 4rem;
}

.section-break {
  padding-bottom: 3rem;
}

.research {
  padding-bottom: 1rem;
}

.research--product {
  font-size: 18pt;
  @apply text-blue-600 underline;
}

.research--authors,
.research--type-date {
  font-size: 15pt;
}

.research--abstract {
  font-size: 13pt;
}

.research--authors {
  font-style: italic;
}
</style>
