import * as TYPES from '../../store/types'

const state = {
  list: [] 
}

/* eslint-disable no-param-reassign */
const mutations = {
  [TYPES.XPOSTS_SET_DATA](st, obj) {
    console.log('Mutation ' + TYPES.XPOSTS_SET_DATA +' fired');
    console.log(obj);
    st.list = obj.list;
    
  },
}

const actions = {
  xpostsSetData({ commit }, obj) {
    console.log('Action ' + TYPES.XPOSTS_SET_DATA +' fired');
    console.log(obj);
    commit(TYPES.XPOSTS_SET_DATA, obj)
  },
}

const module = {
  state,
  mutations,
  actions,
}

export default { module }
