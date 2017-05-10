# Vision
## Goals
Legislators should accurately represent their constituents beliefs and I want individuals to consistently share their beliefs with their legislators. The goal isn't any specific policy, but rather, true representation.

The name of the game is involvement. Constituents who are highly involved are more likely to be heard, and thus, represented accurately. So, increasing the number and variety of involved citizens should improve the accuracy of representation.  "Involved" pretty much means writing to your legislators and keeping up to date on bills.  Not to mention voting.

Naturally, we have to **enable involvement**.  This tool must be understandable and easy to use.  Users should be able to get involved while on the can.  It should be easy to find the issues they care about.  It should be easy to contact representatives.  It goes without saying, but it should be easy to share one's position.

Ideally, we can lower the time, technical knowledge, and effort it takes to get involved, and thus, improve representation. That's the goal!

Bias cannot be allowed in such an effort. It undermines the goal of accurate representation of beliefs.

## Inspirations
- [Countable](https://www.countable.us/)
  * Mobile app
  * Push notifications
  * Plain text summaries
  * Editorial
  * Lacks nuance
- [Fiscal Note](https://fiscalnote.com/)
  * Easily navigate bills and law
  * Breakdown support for bills
  * Apparently built around organizing votes for your goals
  * Pretty vague

## Lessons to learn
### From Countable
People don't know much about the nature of bills.  There is a lot of complexity there.  Countable attempts to simplify things, requiring a great deal of editorializing, introducing bias.  Also, push notifications can be overwhelming for some.  Perhaps the better target audience would be those working diligently to get bills passed.

### From Fiscal Note
Designed for organizations trying to have an effect on bills.  It appears to allow personalized tracking of threats and wins.  Down to the legislator details on who is on board, and who isn't.  I assume there are contact abilities.  This *sounds* amazing, if you can get access.

## Filling the gap
Countable isn't feasible for me.  I can't expect editorial content, and the machine learning summaries are ok at best, its better as supporting content than as the focus of the app.

I really like the sound of Fiscal Note.  However, it doesn't sound like its for normal people.  Sounds like its for experts.  Not to mention, it's so secretive!

*We would create something in between.*  Something that gets people familiar with the system, fast, by presenting high level analysis of legislature.  Which also lets people indicate favor or scorn for bills, providing notifications for changes, and enabling contact with any representative.

### Possible Features
#### Model laws for normies
- High level analysis of legislature for the layperson
  * Visualize graph of laws using something like [vijs](http://visjs.org/network_examples.html)
  * use network analysis to break the into sections, seeking layman insight
  * Show general trends in where votes are happening
*TODO: Theres a lot of potential here, think more about it*

#### Enabling action
- Let people indicate favor or scorn for bills
  * Show related bills
  * Show other user's responses, weighted to prevent network bubble bias
- Calculate likeliness of getting passed
  * Break down by representatives based on previous results (Using Bayes theory?)
  * Showing who to target
- Provide notifications for those interested
  * Passed or rejected or changed
  * Provide control and reasonable defaults
- Enable contact with representatives
  * Omnipresent
  * Allow contacting any number or reps at once
  * This is the "conversion"
- Enable sharing bills and opinions


## The User's Experience
The entry point could be a bill the user is interested in (found on social media?).  This would have to give a peak. What part of the Tree of Laws is this bill in?  What other bills do they have access to?
