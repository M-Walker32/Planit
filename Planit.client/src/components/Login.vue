<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0"
      @click="login"
      v-if="!user.isAuthenticated"
    >
      Login
    </button>

    <div class="dropdown my-2 my-lg-0" v-else>
      <div
        class="dropdown-toggle selectable"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="authDropdown"
      >
        <div v-if="account.picture">
          <img
            :src="account.picture"
            alt="account photo"
            height="40"
            class="rounded"
          />
          <span class="mx-3 text-success lighten-30">{{ account.name }}</span>
        </div>
      </div>
      <div
        class="dropdown-menu p-0 list-group w-100"
        aria-labelledby="authDropdown"
      >
        <div
          data-bs-toggle="modal"
          data-bs-target="#edit-profile-modal"
          class="list-group-item list-group-item-action hoverable"
        >
          Edit Profile
        </div>

        <div
          class="list-group-item list-group-item-action hoverable text-danger"
          @click="logout"
        >
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
    </div>
  </span>

  <Modal id="edit-profile-modal">
    <template #modal-title-slot>
      <h6>Edit Profile</h6>
    </template>
    <template #modal-body-slot>
      <div class="d-flex justify-content-center">
        <img :src="account.picture" class="img-fluid rounded-circle" alt="" />
      </div>
      <div>
        <form @submit.prevent="editAccount">
          <div class="d-flex justify-content-between">
            <div class="mb-3">
              <label for="new-profile-title">Title:</label>
              <input
                name="new-profile-title"
                type="text"
                class=""
                v-model="editable.title"
              />
            </div>
            <div class="mb-3">
              <label for="new-profile-name">Name:</label>
              <input
                name="new-profile-name"
                type="text"
                class=""
                v-model="editable.name"
              />
            </div>
          </div>
          <div class="mb-3">
            <label for="new-profile-picture">Profile Picture url: </label>
            <input
              name="new-profile-picture"
              type="text"
              class=""
              v-model="editable.picture"
            />
          </div>
          <div>
            <button data-bs-dismiss="modal">Cancel</button>
            <button type="submit">Launch</button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
import { accountService } from "../services/AccountService";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { Modal } from "bootstrap";
import { watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    return {
      editable,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
      async editAccount() {
        try {
          await accountService.editAccount(this.account, editable.value)
          editable.value = {}
          Modal.getOrCreateInstance(document.getElementById('edit-profile-modal')).toggle()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
</style>
