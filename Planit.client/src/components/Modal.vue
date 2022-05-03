<template>
  <div
    class="modal fade"
    id="modelId"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modelTitleId"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <slot name="modal-title-slot"></slot>
        </div>

        <div class="modal-body"><slot name="modal-body-slot"></slot></div>
      </div>
    </div>
  </div>
</template>
