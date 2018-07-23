const ProjectLine = {
    props: ['name'],
    template: `<li>
        <span class="app-title"
              v-html="name"></span>
        <slot name="links"></slot>
    </li>`,
};

const ProjectLink = {
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

vm = new Vue({
    el: '#projects-app',
    delimiters: ['${', '}'],
    data() {
        return {
            d: null,
            loading: true,
            errored: false,
        }
    },
    computed: {
        projects() {
            p = []
            for (i in this.d) {
                item = Object.create(null)
                item.name = this.d[i].name
                item.links = []
                for (k in this.d[i].links) {
                    item.links[k] = this.d[i].links[k]
                }
                p.push(item)
            }
            return p
        },
    },
    components: {
        'project-line': ProjectLine,
        'project-link': ProjectLink,
    },
    mounted() {
        this.getProjects();
    },
    methods: {
        getProjects() {
            axios.get('http://127.0.0.1:5000/api/projects')
                 .then(res => {
                    this.d = res.data.projects;
                    console.log(this.d);
                 })
                 .catch(err => {
                    console.log(err);
                    this.errored = true;
                 })
                 .finally(() => this.loading = false);
        },
    },
});