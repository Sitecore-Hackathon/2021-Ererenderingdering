![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2021

- MUST READ: **[Submission requirements](SUBMISSION_REQUIREMENTS.md)**
- [Entry form template](ENTRYFORM.md)
- [Starter kit instructions](STARTERKIT_INSTRUCTIONS.md)
  
## Team name
2021-Ererenderingdering

## Category
The best enhancement to the Sitecore Admin (XP) for Content Editors & Marketers

## Description

Sitecore is storage of data. I even know companies, who use Sitecore only as "advanced" database. Very often stored data is homogeneous. But Sitecore doesn' have any interface for editing this type of data. 

We introduce intgration of Data Grid to Sitecore Content Editor that will allow Content Managers to edit bulk data more quickly and efficiently.

## Video link
[Short Video](https://www.youtube.com/watch?v=NjKQJDqYUu4&ab_channel=antontishchenko)



## Installation instructions
1. Use the Sitecore Installation wizard to install the [package](package.zip)

### Configuration

1. Open item template standart values for which you want to enable Grid editor. E.g.: /sitecore/templates/Hackaton Data/Countries Folder/__Standard Values
2. Turn on viewing "Standard Values"
3. Open Editors field
4. Add "Editors>Items>Grid" Editor
![image](https://user-images.githubusercontent.com/647813/110219747-ae233000-7ec9-11eb-9276-b04d0dd72ee3.png)
5. Save Item
6. Navigate to item inherited from template that you edited and check that Grid Editor appears there.
![image](https://user-images.githubusercontent.com/647813/110219793-f93d4300-7ec9-11eb-934c-7ce2c254ef56.png)

![configuration](https://user-images.githubusercontent.com/647813/110221891-6c00eb00-7ed7-11eb-9503-f7cbdad7bef9.gif)

## Usage instructions

You can view children items in convenient way:
![Visualization](https://user-images.githubusercontent.com/647813/110221990-f0ec0480-7ed7-11eb-969b-a11fba95a34c.gif)

You can easily find children items using search and sorting:
![SearchAndSorting](https://user-images.githubusercontent.com/647813/110222091-740d5a80-7ed8-11eb-8cd3-39eb4597da2f.gif)

You can easily delete children items:
![Delete](https://user-images.githubusercontent.com/647813/110222231-6d331780-7ed9-11eb-8864-ff1e80ce83d1.gif)

You can easily edit children items:
![Edit](https://user-images.githubusercontent.com/647813/110222246-7fad5100-7ed9-11eb-8d97-62d8905072dd.gif)


## Comments

Module is far from production ready version. Purpose of creation of module is prove of concept for bulk editor interface in Sitecore.
Please don't use it in production.
