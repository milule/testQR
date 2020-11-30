class Keys {
    constructor() {
        // console.log("Initialize UUID Key!!!!")
	}
    /**
     * auto generate primary key
     */
    getUuid() {
        const uuid = require('uuid');
        const v4options = {
            node: [
                0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
                0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
            ],
            clockseq: 0x123456780,
            msecs: new Date().getTime(),
            nsecs: 13579
        };
        const result = uuid.v4(v4options, null, 20);
        //console.log("xxxresult:::" + result.toString())
        return result;
    }

    smooth(value) {
        return '' + value + '';
    }
}
module.exports = Keys;