import Mux from '@mux/mux-node'

const { Video } = new Mux("7a65d1d8-a3ec-46b1-9ee4-c2d88afb4750", "3DioWqu6nFsbuIvKFEugIGzhnq6su76bOZU3/VhGWfIm3M4FvLJOM+cb607kpCqCVnRMdPrYhsD");

async function CreateAClip(AssetId, startTime, endTime) {
    const assetUrl = 'mux://assets/' + AssetId
    console.log(AssetId)
    console.log(assetUrl)
    console.log(startTime)
    console.log(endTime)

    try{ 
        const Clip = await Video.Assets.create({
            input :
                {
                    url: assetUrl,
                    start_time: startTime,
                    end_time: endTime
                },
            playback_policy: 'public'
        });

        return Clip
    } catch(e) {
        console.error('Request error', e)
    }
    
    return 0;
}

export default CreateAClip
