<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="modal-title-slot"></slot>
          <button
            type="button"
            class="btn-close align-flex-end"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body"><slot name="modal-body-slot"></slot></div>
      </div>
    </div>
  </div>
</template>
