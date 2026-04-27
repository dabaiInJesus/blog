import DefaultTheme from 'vitepress/theme'
import GithubProjects from '../components/GithubProjects.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GithubProjects', GithubProjects)
  }
}
