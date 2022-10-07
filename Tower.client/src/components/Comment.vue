<template>
  <div class="col-10">
    <div class="row">
      <div class="col-2">
        <img :src="Comment.creator.picture" :alt="Comment.creator.name" :title="Comment.creator.name" class="rounded-circle user-image mx-1">
      </div>
      <div class="col-10 bg-light text-dark p-3">
        <div class="row justify-content-between">
          <div class="col-11 pe-3">
            <h4>{{Comment.creator.name}} <span class="primary-text" v-if="Comment.isAttending">Attending this Event</span></h4>
            <p>{{Comment.body}}</p>
          </div>
          <div class="d-flex align-items-end justify-content-end px-2 col-1">
            <button v-if="Comment.creator.id == account.id" @click="deleteComment(Comment.id)" class="btn btn-danger rounded" title="Delete Comment"><i class="mdi mdi-delete-forever"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { Comment } from '../models/Comment.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    Comment: {type: Comment, required: true}
  },
  setup(){
    return {
      account: computed(()=>AppState.account),
      async deleteComment(commentId) {
        try {
          // TODO delete comment
          await commentsService.deleteComment(commentId)
        } catch (error) {
          Pop.error(error, "[Deleting Comment]")
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.bg-light {
  background-color: #E2F9FF;
}

.primary-text {
  color: #56C7FB;
}

.user-image {
  width: 100% !important;
  padding: 0;
}
</style>