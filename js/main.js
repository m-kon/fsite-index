const ProjectLink = {
    name: 'project-link',
    props: ['line'],
    template: `<a :href="linkPath"
                  target="_blank">
                 <i :class="linkClass"></i>
              </a>`,
    computed: {
        linkClass() {
            if (this.linkType === 'eye') {
                return 'fas fa-eye'
            } else if (this.linkType === 'github') {
                return 'fab fa-github'
            }
        },
        linkPath() {
            return this.line[1];
        },
        linkType() {
            return this.line[0];
        },
    },
};

const ProjectItem = {
    name: 'project-item',
    props: ['project'],
    data () {
        return {
            descriptionVisible: false,
        };
    },
    components: {
        'project-link': ProjectLink,
    },
    template: `<div class="project-item"
                    @click="toggleDescription">
      <div class="project-line">
        <span class="project-title"
              v-html="project.name">
        </span>
        <span class="project-links">
          <project-link v-for="line, i in project.links"
                        :key="i"
                        :line="line">
          </project-link>
        </span>
      </div>
      <div class="project-description"
           v-html="project.description"
           v-if="descriptionVisible">
      </div>
    </div>`,
    methods: {
        hideDescription() {
            this.descriptionVisible = false;
        },
        showDescription() {
            this.descriptionVisible = true;
        },
        toggleDescription() {
            this.descriptionVisible = !this.descriptionVisible;
        },
    },
};

vm = new Vue({
    el: '#projects-app',
    delimiters: ['${', '}'],
    data() {
        return {
            // deploy
            d: null,
            // development
            // d: {
            //     "0": {
            //         "description": "\u0418\u043d\u0434\u0435\u043a\u0441\u043d\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u0441\u0430\u0439\u0442\u0430. JS \u0437\u0430\u0431\u0438\u0440\u0430\u0435\u0442 \u0443 \u0441\u0435\u0440\u0432\u0435\u0440\u0430 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u0445 \u0438 \u0432\u044b\u0432\u043e\u0434\u0438\u0442 \u0435\u0435 \u0432 \u0432\u0438\u0434\u0435 \u0441\u043f\u0438\u0441\u043a\u0430. \u042d\u0442\u043e \u0442\u0435\u043a\u0443\u0449\u0430\u044f \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0430.",
            //         "links": [
            //         [
            //             "github", 
            //             "https://github.com/m-kon/fsite-index"
            //         ]
            //         ],
            //         "name": "FSiTE index"
            //     }, 
            //     "1": {
            //         "description": "\u041f\u0440\u043e\u0441\u0442\u043e \u0443\u0440\u043e\u0434\u0441\u043a\u0438\u0439 \u0442\u0435\u0441\u0442 \u0446\u0432\u0435\u0442\u043e\u0432\u044b\u0445 \u043a\u043b\u0430\u0441\u0441\u043e\u0432 \u0431\u0443\u0442\u0441\u0442\u0440\u0430\u043f\u0430. \u041d\u0430\u043f\u0438\u0441\u0430\u043d \u043d\u0430 Vue.js. \u041f\u043e \u0441\u0443\u0442\u0438 - \u043f\u0440\u0438\u043c\u0438\u0442\u0438\u0432\u043d\u044b\u0439 \u043f\u0435\u0440\u0435\u0431\u043e\u0440 \u043a\u043b\u0430\u0441\u0441\u043e\u0432.",
            //         "links": [
            //         [
            //             "eye", 
            //             "bs01"
            //         ]
            //         ],
            //         "name": "bootstrap color test"
            //     }, 
            //     "2": {
            //         "description": "\u0428\u0430\u0431\u043b\u043e\u043d \u0434\u043b\u044f \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0438 \u043f\u0440\u043e\u0441\u0442\u043e\u0433\u043e \u0430\u0434\u0430\u043f\u0442\u0438\u0432\u043d\u043e\u0433\u043e \u043b\u044d\u043d\u0434\u0438\u043d\u0433\u0430.",
            //         "links": [
            //         [
            //             "eye", 
            //             "fsite-simple-landing"
            //         ], 
            //         [
            //             "github", 
            //             "https://github.com/m-kon/fsite-simple-landing"
            //         ]
            //         ], 
            //         "name": "FSiTE simple landing"
            //     }
            // },
            loading: true,
            errored: false,
        }
    },
    computed: {
        projects() {
            const p = [];
            for (i in this.d) {
                const item = Object.create(null);
                item.name = this.d[i].name;
                item.description = this.d[i].description;
                item.links = [];
                for (k in this.d[i].links) {
                    item.links[k] = this.d[i].links[k];
                }
                p.push(item);
            }
            return p;
        },
    },
    components: {
        'project-item': ProjectItem,
    },
    mounted() {
        // deploy
        this.getProjects();
    },
    methods: {
        getProjects() {
            axios.get('/api/projects')
                 .then(res => {
                    this.d = res.data.projects;
                 })
                 .catch(err => {
                    console.log(err);
                    this.errored = true;
                 })
                 .finally(() => this.loading = false);
        },
    },
});