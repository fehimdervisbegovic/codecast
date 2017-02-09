
<script>
  import Vue from 'vue'
  import { mapActions, mapState } from 'vuex'
  import CcPagination from 'components/general/pagination'

  export default {
   
    name: 'CcXposts',
    data() {
          return {
            xposturl: 'http://jsonplaceholder.typicode.com/'
          };
    },
    components: {
      CcPagination,
    },

    methods: {
      edit(id) {
        console.log("Edit " + id);
        this.$router.push({
          name: 'xposts.edit',
          params: { id },
          query: { page: this.currentPage } })
      },
      create() {
        this.$router.push({ name: 'xposts.new', query: { page: this.currentPage } })
      },
      hide() {
        this.$router.push({ name: 'xposts.index', query: { page: this.currentPage } })
      },
      
      ...mapActions(['xpostsSetData', 'setFetching']),

      fetch() {
        this.fetchFullList()
      },

      fetchFullList() {
        this.setFetching({ fetching: true })
        this.$http.get(this.xposturl + 'posts').then(({ data }) => {
          this.xpostsSetData({
            list: data,
          })
          this.setFetching({ fetching: false })
        })
      },

      navigate(obj) {
       
        this.$router.push({ name: 'xposts.index', query: { page: obj.page } })

        Vue.nextTick(() => this.fetchFullList())
      },

      askRemove(xpost) {
        swal({
          title: 'Are you sure?',
          text: `Xpost ${xpost.title} will be permanently removed.`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, do it!',
          closeOnConfirm: false,
        }, () => this.remove(xpost)) // callback executed when OK is pressed
      },

      /**
      * Makes the HTTP requesto to the API
      */
      remove(xpost) {
        this.$http.delete(this.xposturl + `posts/${xpost.id}`).then(() => {         

          this.fetchFullList()

          swal('Done!', 'X Post has been removed.', 'success')

          if (this.isFormVisible) {
            this.$router.push({ name: 'xposts.index', query: { page: 1 } })
          }
        })
        .catch((error) => {
          
          swal('Error!', error.response.data.messages[0], 'error')
        })
      },
    },

    computed: {
      ...mapState({
        fetching: state => state.fetching,
        //pagination: state => state.XPosts.pagination,
        list: state => state.XPosts.list,
      }),
      xposts() {
        return this.list
      },
      currentPage() {
        return parseInt(this.$route.query.page, 10)
      },
      isFormVisible() {
        return this.$route.name === 'xposts.new' || this.$route.name === 'xposts.edit'
      },
    },
  
    beforeRouteLeave(to, from, next) {
      this.$bus.$off('navigate')
      this.$bus.$off('xposts.created')
      this.$bus.$off('xposts.updated')
      jQuery('body').off('keyup')
      next()
    },
    mounted() {
    
      this.$bus.$on('navigate', obj => this.navigate(obj))
     
      this.$bus.$on('xposts.created', this.fetch)
      this.$bus.$on('xposts.updated', this.fetch)
      
      this.fetchFullList()
    },
    
    updated() {     
      jQuery('[data-toggle="tooltip"]').tooltip()
    },
  }
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h1>XPosts Management</h1>
      </div>
      <div class="col-md-6 text-right">
        <div class="button-within-header">
          <a href="#"
            v-show="!isFormVisible"
            @click.prevent="create"
            class="btn btn-xs btn-default"
            data-toggle="tooltip" data-placement="top"
            title="Show XPost form">
            <i class="fa fa-fw fa-plus"></i>
          </a>
          <a href="#"
            v-show="isFormVisible"
            @click.prevent="hide"
            class="btn btn-xs btn-default"
            data-toggle="tooltip" data-placement="top"
            title="Hide XPost form">
            <i class="fa fa-fw fa-minus"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Form to create/edit will be inserted here  -->
    <!-- when navigate to /nova or /editar/{id}  -->
    <!-- see /src/modules/categories/routes.js  -->
    <transition name="fade">
      <router-view></router-view>
    </transition>

    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="xpost in xposts">
          <td width="1%" nowrap>{{ xpost.id }}</td>
          <td>{{ xpost.title }}</td>
          <td>{{ xpost.body }}</td>
          <td width="1%" nowrap="nowrap">
            <a href="#"
              @click.prevent="edit(xpost.id)"
              class="btn btn-xs btn-default"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit">
              <i class="fa fa-fw fa-pencil"></i>
            </a>
            <a href="#"
              @click="askRemove(xpost)"
              class="btn btn-xs btn-default"
              data-toggle="tooltip"
              data-placement="top"
              title="Remove">
              <i class="fa fa-fw fa-times"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <!--<div>
      <cc-pagination
        :pagination-data="pagination"
        :current-page="currentPage"
        :max-items="12">
      </cc-pagination>
    </div>-->
  </div>
</template>

<style scoped>
  .button-within-header {
    margin-top: 32px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .7s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
