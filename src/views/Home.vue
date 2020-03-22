<template>
<div>
  <CRow>
      <CCol col="12" sm="6" lg="3">
        <CLink
          class="font-weight-bold font-xs btn-block text-muted"
          to="/guests"
        >         
          <CWidgetIcon
            header="25"
            text="Guests"
            color="primary"
          >
            <CIcon name="cil-user" width="24"/>
          </CWidgetIcon>
        </CLink>
      </CCol>
  </CRow>
</div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
