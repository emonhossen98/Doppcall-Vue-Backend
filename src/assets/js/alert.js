
function delete_data(e) {
    Swal.fire({
        title: "Are you sure delete?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
    }).then((t => {
        t.isConfirmed && (event.preventDefault(), document.getElementById("delete-form-" + e).submit(), Swal.fire("Deleted Successfull!", "", "success"))
    }))
}