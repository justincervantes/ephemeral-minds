import React from "react";

function JournalAnalytics(props) {
    let weightsSortedByWeight = props.weights.sort((a, b) => {
        if (a.weight < b.weight) return -1;
        if (a.weight > b.weight) return 1;
        return 0;
    });

    const allEntries = [...props.entries];
    const lowestScore = allEntries.reduce((prev, curr) => {
        return prev.score < curr.score ? prev : curr;
    }, 0);

    const highestScore = allEntries.reduce((prev, curr) => {
        return prev.score > curr.score ? prev : curr;
    }, 0);

    const highestMagnitude = allEntries.reduce((prev, curr) => {
        return prev.magnitude > curr.magnitude ? prev : curr;
    }, 0);

    const lightestWeightRecord = weightsSortedByWeight[0];
    const heaviestWeightRecord =
        weightsSortedByWeight[weightsSortedByWeight.length - 1];

    const closestEntryToLightest = allEntries.reduce((prev, curr) => {
        return Math.abs(
            new Date(prev.date) - new Date(lightestWeightRecord?.date)
        ) < Math.abs(new Date(curr.date) - new Date(lightestWeightRecord?.date))
            ? prev
            : curr;
    }, 0);

    const closestEntryToHeaviest = allEntries.reduce((prev, curr) => {
        return Math.abs(
            new Date(prev.date) - new Date(heaviestWeightRecord?.date)
        ) < Math.abs(new Date(curr.date) - new Date(heaviestWeightRecord?.date))
            ? prev
            : curr;
    }, 0);

    // console.log("Weights", weightsSortedByWeight);
    // console.log("Lightest Weight", lightestWeightRecord);
    // console.log("Heaviest Weight", heaviestWeightRecord);
    // console.log("Closest to Heaviest Weight", closestEntryToHeaviest);
    // console.log("Entites", props.entries);
    // console.log("Sorted Weights", sortedResultByWeight);
    console.log("Most Common Word", props);
    // console.log("Lowest Score", lowestScore);
    // console.log("Highest Score", highestScore);
    // console.log("Highest Magnitude", highestMagnitude);

    return (
        <div>

            <div className={props.block ? "pt-2" : "pt-2 card-columns"} style={{ height: "100%" }}>
                <div
                    className={props.block ? "card text-white bg-primary m-2 card-block" : "card text-white bg-primary m-2"}
                >
                    <div className="card-header">Most Frequently Used Word</div>
                    <div className="card-body">
                        {props.mostUsedWord ? (<><h5 className="card-title">
                            {props.mostUsedWord?.value}
                        </h5>
                        <p className="card-text">
                            You've used the word {props.mostUsedWord?.value} a
                            total of {props.mostUsedWord?.count} times across
                            all your entries.
                        </p></>) : "Please write your first entry and weight to get started"}

                    </div>
                </div>

                <div
                    className="card text-white bg-secondary m-2"
     
                >
                    <div className="card-header">Least Happy Entry</div>
                    <div className="card-body">
                    {props.lowestScore ? (<>
                        <h5 className="card-title"> {lowestScore.title}</h5>
                        <p className="card-text">
                            Your least happy entry was written on{" "}
                            {lowestScore.date}, and had a sentiment score of{" "}
                            {Math.round(lowestScore.score * 100) / 100}. The
                            lowest possible sentiment score is -1.
                            </p></>) : "Please write your first entry and weight to get started" }
                    </div>
                </div>

                <div
                    className="card text-white bg-success m-2"
                >
                    <div className="card-header">
                        Closest Entry at Lightest Weight
                    </div>
                    <div className="card-body">
                    {closestEntryToLightest && lightestWeightRecord ? (<>
                        <h5 className="card-title">
                            {closestEntryToLightest.title}
                        </h5>
                        <p className="card-text">
                            Your lightest weight was recorded on{" "}
                            {lightestWeightRecord?.date}
                            , where you weighed {lightestWeightRecord?.weight}{" "}
                            lbs. The closest entry was created on{" "}
                            {closestEntryToLightest?.date}.
                            </p></>) : "Please write your first entry and weight to get started" }
                    </div>
                </div>

                <div
                    className="card text-white bg-danger m-2"
                >
                    <div className="card-header">Most Emotional Entry</div>
                    <div className="card-body">
                    {highestMagnitude ? (<>
                        <h5 className="card-title">{highestMagnitude.title}</h5>
                        <p className="card-text">
                            Your most emotionally charged entry (irrespective of
                            positivity) was written on {highestMagnitude.date}.
                            </p></>) : "Please write your first entry and weight to get started" }
                    </div>
                </div>

                <div
                    className="card text-white bg-warning m-2"
                >
                    <div className="card-header">Happiest Entry</div>
                    <div className="card-body">
                    {highestScore ? (<>
                        <h5 className="card-title">{highestScore.title}</h5>
                        <p className="card-text">
                            Your happiest entry was written on{" "}
                            {highestScore.date}, and had a sentiment score of{" "}
                            {Math.round(highestScore.score * 100) / 100}. The
                            highest possible sentiment score is +1.
                            </p></>) : "Please write your first entry and weight to get started" }
                    </div>
                </div>

                <div
                    className="card text-white bg-info m-2"
                >
                    <div className="card-header">
                        Closest Entry to Heaviest Weight
                    </div>
                    <div className="card-body">
                    {closestEntryToHeaviest &&  heaviestWeightRecord ? (<>
                        <h5 className="card-title">
                            {closestEntryToHeaviest.title}
                        </h5>
                        <p className="card-text">
                            Your heaviest weight was recorded on{" "}
                            {heaviestWeightRecord?.date.split("T")[0]}, where
                            you weighed {heaviestWeightRecord?.weight} lbs. The
                            closest entry was created on{" "}
                            {closestEntryToHeaviest?.date}.
                            </p></>) : "Please write your first entry and weight to get started" }
                    </div>
                </div>
            </div>
        </div>
    );
   
}


    /* <TagCloud
        minSize={12}
        maxSize={40}
        tags={words}
        className="simple-cloud"
        disableRandomColor={true}
        onClick={(tag) =>
          alert(`'${tag.value}' was selected with ${tag.count} occurances!`)
        }
      /> */


export default JournalAnalytics;
