/* eslint-disable */
let plugins = [
]

let plugins2 = [
    
]

export default function searchUtil(keyword) {
    let results = []

    let works = keyword.split(/\s+\|\s+/)
    console.log('works', works)
    let result = ''
    let hasResult = false
    for (let i = 0; i < works.length; i++) {
        let keyword2 = ''
        if (i === 0) {
            keyword2 = works[i]
        } else {
            keyword2 = works[i] + ' ' + result
        }
        console.log('keyword2', keyword2)
        let arr = keyword2.split(/\s+/)
        for (let item of plugins2) {
            if (item.name === arr[0] || item.en === arr[0]) {
                result = item.handler(keyword2, arr)
                hasResult = true
                break
            }
        }
    }
    hasResult && results.push({
        type: 'result',
        question: `结果`,
        result: result
    })
    // let arr = keyword.split(/\s+/)
    // for (let item of plugins2) {
    //     if (item.name === arr[0]) {
    //         results.push({
    //             type: 'result',
    //             question: `结果`,
    //             result: item.handler(keyword, arr)
    //         })
    //     }
    // }
    return results
}
