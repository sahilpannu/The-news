async function fetchRSS() {
    const rssUrl = "https://feeds.bbci.co.uk/news/uk/rss";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch news.");
        
        const data = await response.json();
        let newsHTML = "";
        data.items.slice(0, 5).forEach(item => {
        const imageUrl = item.enclosure ? item.enclosure.link : "https://via.placeholder.com/150"; // Default image if not available 
        data.items.slice(0, 5).forEach(item => {
            newsHTML += `
                <div class="news">
                    <img src="${imageUrl}" alt="News Image">
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.description || "No description available."}</p>
                </div>`;
        });

        document.getElementById("news-container").innerHTML = newsHTML;
    } catch (error) {
        console.error("Error fetching RSS:", error);
        document.getElementById("news-container").innerHTML = "⚠️ Unable to load news.";
    }
}

fetchRSS();
