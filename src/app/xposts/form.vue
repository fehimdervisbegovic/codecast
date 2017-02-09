
<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    name: 'CcXpostForm',

    /**
    * Component's local state
    */
    data() {
      return {
        xposturl: 'http://jsonplaceholder.typicode.com/',
        xpost: {
          userId: 1,
          id: 0,
          title: '',
          body: '',
        },
      }
    },

    
    /**
    * Fetch xposts when component is first mounted
    */
    mounted() {
      this.fetch()
    },

    /**
    * Also fetch category every time route changes
    */
    watch: {
      $route: 'fetch',
    },

    /**
    * Determines based on the presence of
    * xpost id if the current actions
    * is editing instead of creating.
    */
    computed: {
      isEditing() {
        return this.xpost.id > 0
      },
      isValid() {
        this.resetMessages()
        if (this.xpost.title === '') {
          this.setMessage({ type: 'error', message: ['Please fill post Title'] })
          return false
        }
        if (this.xpost.body === '') {
          this.setMessage({ type: 'error', message: ['Please fill post Body'] })
          return false
        }
        return true
      },
    },

    methods: {
      ...mapActions(['setFetching', 'resetMessages', 'setMessage']),
    
      fetch() {
        this.$refs.firstInput.focus()

        const id = this.$route.params.id
        
        if (id !== undefined) {
         
          this.setFetching({ fetching: true })
          this.$http.get(this.xposturl + `posts/${id}`).then((res) => {
            const {userId, id: _id, title, body } = res.data // http://wesbos.com/destructuring-renaming/
            this.xpost.id = _id
            this.xpost.title = title
            this.xpost.body = body
            this.setFetching({ fetching: false })
          })
        }
      },
      submit() {
        
        if (this.isValid) {
          
          this.setFetching({ fetching: true })

          if (this.isEditing) {
            this.update()
          } else {
            this.save()
          }
        }
      },
      save() {
        this.$http.post(this.xposturl + 'posts', { 
          useriId:1, 
          title: this.xpost.title,
          body: this.xpost.body
        }).then(() => {
         
          this.$bus.$emit('xpost.created')

          this.setFetching({ fetching: false })

          this.setMessage({ type: 'success', message: 'New XPost has been created' })

          this.reset()
        })
      },
      update() {
        this.$http.put(this.xposturl + `posts/${this.xpost.id}`, this.xpost).then(() => {
          
          this.$bus.$emit('xpost.updated')

          this.setFetching({ fetching: false })

          this.setMessage({ type: 'success', message: 'XPost has been updated' })
        })
      },
      reset() {
        this.xpost.id = 0
        this.xpost.title = '',
        this.xpost.body = '',
        this.xpost.userId = 1
      },
    },
  }
</script>

<template>
  <form @submit.prevent="submit" class="well">
    <div class="form-group">
      <label for="title" class="control-label">Title</label>
      <input ref="firstInput" type="text" id="title" class="form-control" v-model="xpost.title">
    </div>
    <div class="form-group">
      <label for="body" class="control-label">Content</label>
      <input ref="secondInput" type="text" id="body" class="form-control" v-model="xpost.body">
    </div>
    <button class="btn btn-primary btn-xs" type="submit">Save</button>
  </form>
</template>