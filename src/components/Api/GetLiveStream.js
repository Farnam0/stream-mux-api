import Mux from '@mux/mux-node'

const { Video } = new Mux("7a65d1d8-a3ec-46b1-9ee4-c2d88afb4750", "3DioWqu6nFsbuIvKFEugIGzhnq6su76bOZU3/VhGWfIm3M4FvLJOM+cb607kpCqCVnRMdPrYhsD");
async function GetLiveStream() {
    try{ 
        return await Video.LiveStreams.create({
            playback_policy: 'public',
            new_asset_settings: { playback_policy: 'public' }
        });  

    } catch(e) {
        console.error('Request error', e)
    }
    return 0;
}

export default GetLiveStream
