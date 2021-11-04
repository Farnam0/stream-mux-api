import Mux from '@mux/mux-node'

const { Video } = new Mux("4a875045-e081-416d-bfb6-193498df9553", "9s1nVYdsRPapK/J07idbqYhYO3RJ5lDGgtd7fDg/SDY/hEeLaERwH1gw0Qtkg+UMCeAy6r5eXjY");

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
