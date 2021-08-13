import request from '@/plugin/axios'
export function verify_invoice(data,that) {
    request({
        url: 'api/v1/ProcurementContract/Invoice/verify_invoice',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialog_Add=false
            that.save_fy1 = that.save_fy2 = that.save_fy3 = false
            that.fetchData();
        } else {
            that.$message({
                message: res.msg,
                type: 'success'
            });
            that.save_fy1 = that.save_fy2 = that.save_fy3 = false
        }
        setTimeout(() => {
        }, 500)
    }).catch(rr => {
        that.save_fy1 = that.save_fy2 = that.save_fy3 = false
    });
}
