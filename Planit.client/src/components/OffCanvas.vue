<template>
  <div tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
    <div class="offcanvas-header">
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <slot name="offcanvas-header-slot"> </slot>
    </div>
    <div class="offcanvas-body">
      <slot name="offcanvas-task-slot"> </slot>
    </div>
    <div class="offcanvas-body">
      <slot name="offcanvas-note-slot"> </slot>
    </div>
  </div>
</template>