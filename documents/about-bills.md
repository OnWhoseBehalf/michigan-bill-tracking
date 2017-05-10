# About Bills

## Domain - Michigan Laws
### Terms:
See [Glossary of terms](http://www.legislature.mi.gov/(S(cekdb3afgufp4nk0q02e3jpz))/mileg.aspx?page=glossary)

Most of the following terms are the same across chamber.
#### Senate
  - Senate bill - SB
    * Amends laws (a diff)
  - Senate resolution - SR
    * Non-binding agreement, declarations
  - Senate joint resolution - SJR
    * Used to update the constitution
  - Senate Concurrent Resolution - SCR
    * Used for cross chamber coordination

#### House
  - House bill - HB
    * Amends laws
  - House resolution - HR
    * Non-binding agreement, declarations
  - House joint resolution - HJR
    * Used to update the constitution
  - Senate Concurrent Resolution - HCR
    * Used for cross chamber coordination

#### Other
  - Public Act - PA
    * Having pass both chambers and the governor's desk

### Lifecycle of a bill
We get snapshots of bills in a few states in their lifecycles. [Here is an example](http://legislature.mi.gov/doc.aspx?2016-SB-0982).

#### States:
 - Introduced
 - Passed House / Senate, each
 - Senate / House Concurs
 - Senate / House Enrolls
 - Public Act - The law
 - *Presumably a rejected state*

I think we will want to capture the condition of the bill in each of these steps (it will change for each step).  There are other shorter term iterations as well, for example, while being edited, bills get changed and voted on multiple times.  

## Data sources
### Feeds
A good overview is the daily summary ([link](http://legislature.mi.gov/doc.aspx?daily)).

#### RSS
There are RSS feeds, but I don't really understand them yet.  I expect it will be the most up to date source of data, but will possibly be too granular.
- [Bills](http://www.legislature.mi.gov/documents/publications/RssFeeds/billupdate.xml)
- [Laws](http://www.legislature.mi.gov/documents/publications/RssFeeds/MCLupdate.xml)

I asked them for more of a detailed description of what is happening here, waiting to hear back.

### Bill details (for HB, SB.  Joint and concurrent resolutions are likely similar)
[Bill overview pages](http://legislature.mi.gov/doc.aspx?2017-HB-4082) contain the most up to date details. Links to these pages can be found in the feeds.

Details include
  - Sponsor
  - Categories
  - Description
  - Bill versions
  - Bill analysis (if it exists)

# Bill summarization with [gensim](https://radimrehurek.com/gensim/index.html)
## Goals
Following [this tutorial](https://rare-technologies.com/text-summarization-with-gensim/)
- Take whole bills
- Summarize into layman readable content
- Summarize changes

### Bill text
Bills follow these formatting rules
> The following bill formatting applies to the 2017-2018 session:
> - New language in an amendatory bill will be shown in BOLD AND UPPERCASE.
> - Language to be removed will be stricken.
> - Amendments made by the House will be blue with square brackets, such as: [House amended text].
> - Amendments made by the Senate will be red with double greater/lesser than symbols, such as: <<Senate amended text>>.

We should capture all these features.

## Running Summarization
### Install
Set up python
Installed on Mac using https://radimrehurek.com/gensim/install.html
Start python

### Script
Import gensim.
```python
from gensim.summarization import summarize
from gensim.summarization import keywords
```

Log the summary
```python
print summarize(text)
print keywords(text)
```

## Initial Findings
Laws are often detailed rules for particular portions of other existing laws.  Bills often only add and remove text.  So, we can present several different data sets:
- Entire bill
- Additions / Subtractions to / from bill
- Meta data:
  - Creators
  - Provided description

### Analyzing Entire Bill
When posted to the public, a warning should be shown expressing the experimental nature of the summary.  It certainly captures the dry tone all laws have.  I worry the true meaning is lost.

I was playing with [this bill](http://www.legislature.mi.gov/documents/2017-2018/billintroduced/House/htm/2017-HIB-4437.htm).

A clean version of the text exists at `./hb4437.txt`.

```python
print summarize(text, ratio=0.02)
```

A quick summary yields something like this

> Beginning on and after January 1, 2007, subject to any limitation provided in this subdivision, a taxpayer who is a senior citizen may deduct to the extent included in adjusted gross income, interest, dividends, and capital gains received in the tax year not to exceed $9,420.00 for a single return and $18,840.00 for a joint return.
Beginning January 1, 2013, for a person born in 1946 through 1952 who receives retirement or pension benefits from employment with a governmental agency that was not covered by the federal social security act, chapter 531, 49 Stat 620, the sum of the deductions under subsections is limited to $35,000.00 for a single return and, except as otherwise provided under this subdivision, $55,000.00 for a joint return.

**TODO - Verify cleanliness of results**
I can verify the cleanliness of this description by:
- reading and understanding the bill
- comparing to MichiganVotes summaries
- asking for help from the MichiganVotes people

### Analyzing Additions / Subtractions alone
#### Acquiring added text
Bill text is nicely formatted in HTML pages [like so](http://www.legislature.mi.gov/documents/2017-2018/billintroduced/House/htm/2017-HIB-4437.htm).

We can grab the additions from the page with
```es6
var spans = document.getElementsByTagName('span');
var mySpans = [...spans]
var output = mySpans
  .filter(function(span) {
    return span.style.textTransform === 'uppercase';
  })
  .reduce(function(str, span){
    return str += span.innerHTML;
  }, '');

console.log(output);
```

The result is stored in `./hb4437-added.txt`.

Currently I'm removing the line breaks by hand.  
I am using the regex `\(([^\)]+)\)` to find and remove things between parens.

```python
print summarize(text)
```
gives us:
> For each tax year beginning on and after January 1, 2019, the income thresholds for the adjustment or elimination of exemption allowances under subsection (7) shall be adjusted for inflation by the department of treasury by multiplying each income threshold by a fraction, the numerator of which is the midwest employment cost index for the east north central division for the state fiscal year ending in the tax year prior to the tax year for which the adjustment is being made and the denominator of which is the midwest employment cost index for the east north central division for the 2016-2017 state fiscal year.

And the keywords are

```
income
disabled
exemption
shall
return
tax year beginning
state
states
exemptions allowable
labor
allowed
allowance
allowances
armed
```

Again, I will have to verify.
