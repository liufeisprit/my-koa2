import './assets/common.sass'
function changeTitle() {
    $('#app').html('parcel大包包')
}
setTimeout(() => {
    changeTitle()
}, 2000);