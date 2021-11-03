import Mux from '@mux/mux-node'

const { Video } = new Mux("4a875045-e081-416d-bfb6-193498df9553", "9s1nVYdsRPapK/J07idbqYhYO3RJ5lDGgtd7fDg/SDY/hEeLaERwH1gw0Qtkg+UMCeAy6r5eXjY");

async function CreateAClip() {
    try{ 
        const Clip = await Video.Assets.create({
            input :
                {
                    url: "mux://assets/K22jVjELr7LrAxpcmt4exXrVT7DG663NAMWoQs9sUis",
                    start_time: 0.1,
                    end_time: 1.0
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