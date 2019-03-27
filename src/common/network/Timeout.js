


class Timeout {


   constructor(){};

    /**
     * fetch 网络请求超时处理
     * @param original_promise 原始的fetch
     * @param timeout 超时时间 30s
     * @returns {Promise.<*>}
     */
     timeoutFetch = (original_fetch, timeout = 30000) => {
        let timeoutBlock = () => {}
        let timeout_promise = new Promise((resolve, reject) => {
            timeoutBlock = () => {
                // 请求超时处理
                reject('请求超时，请重试！')
            }
        });

        // Promise.race(iterable)方法返回一个promise
        // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
        let abortable_promise = Promise.race([
            original_fetch,
            timeout_promise
        ]);

        setTimeout(() => {
            timeoutBlock()
        }, timeout);

        return abortable_promise
    }

}

export default  new Timeout().timeoutFetch;
