import QdtComponents from 'qdt-components'

const host = 'dashboards.philasd.org' // window.location.hostname

const config = {
  host,
  prefix: '',
  port: host === 'localhost' ? 4848 : 443, // window.location.port,
  secure: host === 'localhost' ? window.location.protocol === 'https:' : true,
  appId:
    host === 'localhost'
      ? '[Mashup] College & Career'
      : '552cabdc-35f9-4f90-8e91-356b0bc222d1',
}
const connections = {
  vizApi: true,
  engineApi: true,
}
const qdtComponents = new QdtComponents(config, connections)

export default ({ app }, inject) => {
  inject('qdt', qdtComponents)
}
