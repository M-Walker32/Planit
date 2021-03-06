<template>
  <span class="navbar-text">
    <button
      class="btn selectable text-light lighten-30 text-uppercase my-2 my-lg-0"
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
        <div v-if="account.picture" class="d-flex align-items-center">
          <div class="on-hover">
            <h6 class="mx-3 text-light lighten-30">{{ account.name }}</h6>
            <span v-if="account.title">{{ account.title }}</span>
          </div>
          <img
            :src="account.picture"
            alt="account photo"
            height="40"
            class="rounded"
          />
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
              <label class="text-dark" for="new-profile-title">Title:</label>
              <input
                name="new-profile-title"
                type="text"
                class="input-group-text"
                v-model="editable.title"
              />
            </div>
            <div class="mb-3">
              <label class="text-dark" for="new-profile-name">Name:</label>
              <input
                name="new-profile-name"
                type="text"
                class="input-group-text"
                v-model="editable.name"
              />
            </div>
          </div>
          <div class="d-flex flex-column align-items-center mb-3">
            <label class="text-dark" for="new-profile-picture">Picture:</label>
            <input
              name="new-profile-picture"
              type="text"
              class="input-group-text"
              v-model="editable.picture"
            />
          </div>
          <div class="">
            <button
              class="button-nice bg-primary m-2"
              data-toggle="tooltip"
              data-placement="top"
              title="Cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              class="button-nice m-2"
              type="submit"
              data-toggle="tooltip"
              data-placement="top"
              title="Submit edits"
            >
              Submit
            </button>
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
          console.log(editable.value)
          await accountService.editAccount(editable.value)
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
