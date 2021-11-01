import Mux from '@mux/mux-node'
const { Video } = new Mux("4a875045-e081-416d-bfb6-193498df9553", "9s1nVYdsRPapK/J07idbqYhYO3RJ5lDGgtd7fDg/SDY/hEeLaERwH1gw0Qtkg+UMCeAy6r5eXjY");

async function GetLiveStream() {
    try{ 
        const LiveStream = await Video.LiveStreams.create({
            playback_policy: 'public',
            new_asset_settings: { playback_policy: 'public' }
        });  
        return LiveStream
    } catch(e) {
        console.error('Request error', e)
    }
    
    return 0;
}

export default GetLiveStream
