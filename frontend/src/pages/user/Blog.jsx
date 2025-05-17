import { useState } from "react";

const destinations = [
  {
    id: 1,
    title: "Kagbeni",
    subtitle: "Gateway to Upper Mustang",
    image:
      "https://i.pinimg.com/originals/41/8f/de/418fde9bb2139b2a5f01fc734c20797e.jpg",
    content:
      "Situated at the confluence of the Kali Gandaki and Jhong Rivers, Kagbeni is a medieval village that serves as the gateway to Upper Mustang. With its narrow alleys, ancient monasteries, and traditional mud-brick houses, Kagbeni offers a glimpse into Tibetan-influenced culture.",
  },
  {
    id: 2,
    title: "Tansen",
    subtitle: "Hilltop Heritage Town",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.sSxVinvmmv1smTUKQtAVFgHaEj&pid=Api&P=0&h=220",
    content:
      "Perched atop the Shreenagar Hills in western Nepal, Tansen is a charming town known for its rich history and panoramic views. The town's narrow streets are lined with traditional Newari architecture.",
  },
  {
    id: 3,
    title: "Dhorpatan",
    subtitle: "Nepal's Only Hunting Reserve",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.YQugFKOSo94NPNwPN6P9gQHaE8&pid=Api&P=0&h=220",
    content:
      "Located in the western part of Nepal, Dhorpatan is home to the country's only hunting reserve, established in 1987. The reserve spans diverse ecosystems, from alpine meadows to dense forests.",
  },
  {
    id: 4,
    title: "Gorkha",
    subtitle: "Birthplace of Modern Nepal",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.zu-w0ZXLBoJ0pKk16gH1qgHaFG&pid=Api&P=0&h=220",
    content:
      "Gorkha holds a significant place in Nepal's history as the birthplace of King Prithvi Narayan Shah, who unified the country in the 18th century.",
  },
  {
    id: 5,
    title: "Jiri",
    subtitle: "Switzerland of Nepal",
    image:
      "https://english.onlinekhabar.com/wp-content/uploads/2021/11/Jiri-Mountain-Nepal-Valley.jpg",
    content:
      "Often referred to as the 'Switzerland of Nepal,' Jiri is a picturesque town nestled in the eastern hills. It served as the traditional starting point for treks to Everest.",
  },
  {
    id: 6,
    title: "Rara Lake",
    subtitle: "Nepal's Largest Lake",
    image: "https://hsj.com.np/uploads/0000/386/2020/05/04/rara-1.jpg",
    content:
      "Situated in the remote Mugu district, Rara Lake is Nepal's largest lake, renowned for its crystal-clear waters and tranquil surroundings.",
  },
  {
    id: 7,
    title: "Panch Pokhari",
    subtitle: "Five Sacred Lakes",
    image:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUWFxcXFxYYFRgZFxgYGBcWFxYaFhcYHSggGBolGxUXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGyslICUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALMBGgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAQIDBQYAB//EAD4QAAEDAgQDBQYFAgYBBQAAAAEAAhEDIQQSMUEFUWETInGBkQYyQqGx0RRSweHwFfEjM2JygpIHFjRTg7L/xAAaAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/8QALhEAAgICAgEDAwMCBwAAAAAAAAECEQMhBBIxE0FRFCJxBTKRM0IVQ2GBscHh/9oADAMBAAIRAxEAPwDVZEoYpoSwu13ON0IQxLkUsJVXdl9CIMTsiellTsydUMDEoYnSlVdi+qG5EuVKuUsukIAnZUgSyqsuhYXAJMy7OoTQ6FyZ2oXdqFCaJFwUXbBJ24UpktBC5DnEBd+ICrqy+yCClCF/EKVgeWlwaSBvso1XktO/BMuUBz/ld6FNrOc0w4ESJvyVVZG6CUiC7YrjVKtQZXdBspC5BZyuzFTqX2CnVFEaijBSQq0gkrHmomF5XFIp2J0EJSSnJIU7E6jZUgqFcAmwh7F9Bv4kLvxQQFJpdZoJ8ipnYSoDBafktPWKMneT8II/Fhd+KUY4dUmIHqETheC1HG5DRz19Ahbxryw0sj8IiOLSfilcUOC02Al/fvYmwA8AVV8VwgcSaYaI2mAUEcsJOkMliyRjbInYtIMWgchHvOjylR9k43kR4p6jEzOUyy/FFIcSUBRH5jHqVO1jfzkmdI2VNRRalJk/blJ+J6poNPSDPipGVmDWmPGVVr4C6y+Rvbru0U1XEU7ZWNPS6T+pNFuzDfJV2+EX0+WRdonta46ArjxoD4Qh3cVqONjA5KXJ+xKivcJNN3I+ikbhH/l+Y+6FZjXblWeFrOIkAXQSnJBwhGQ1vDn7wPP7J7OHyfeCZVxzxaLoXtHeCBSmxjhjXsWFGhSBkuzRtoFb0+Is0+izRYdVJTB1mEucO3ljMc+n7UaGpjeRhV2OOeMxNrj7eCGoOgGbypqjgR1QRgovQyUuy2RNYzcfNdUa0mwhRkXSlMti+q+DnAJkJ0pjipbL6oUppKSUkqrLo4lMJUmVRvbClkoUFIXQm1nhrZcQPNU+Kxuaw026qNkSLM4vknDE9FX0KJgkm6kCzyzpPQ2OP5ChxURGY+QTRxYc3HxWer8ekQGADwhCv4g87geAXWXH+UcmXKrwzVu4wOV/FQ1OM1D8UDlKx9Sq46klOFYo1xYinzZGqdxNx+L5qKrjT4+Sp8JiRN9FosNwvtG5gfBLnGOPyOhKWVaK04txXduefkmvbBI5KehVo+73S7nKJ0CrfuNouB94lWmSgRZxafGVWvYJ0UdURoP3QNdvDDUuq2gh9iQHA9VMMG8tzASFXDLNyb7fZaymQKAa0zAt+qHLLpQeKCndgPDsO2JIujqxa5pBQRqGwa2Sdgj3YQtpku1iYWab3ZqhHVIp34VvgloYVp+LyTK1aNbQg/6jBsIT12aENQTLlmHARFIxZUbOIvO/yRtDiI7rd5SpRl7jYyj7B9UJrUYykHjVAVO66Jkc+qBSvQyUfckldmUVR14ChOJAV1YNpBZeo+0KgGJCfnClEsnFRLnQZxABhNoYsOMAypRdoJc+67MhcViWtvN+Sg/qbQb28Vai2RySLAFSBDYWrnOlue3qi6mIZS97XpB9eSVN0MgrFa3mgeIYyBZSYrHBwtYcvuqrE3sTZJeVIZ1Kuo41HG+l/wCeiNwODBANrTHVQ1S1ndaIJGv86Kwo0bAO0s1sg6kECPkZWfJmctFqKRExrmktdO8FNzHqmsrvyNzTaWmddYBHMSPn4rhUdySGywT+g1SM2SPEgH0RFD2dcQC50dBcrQYjEgndPZiQB0XoXyMlHLXFx2VOG9m6WYZnON/dsJ6HdE4jgWHm1OB/uP3RJxjQZPqmYnilMe+4CeaD1cjfljPRwpeEQcN9mGe85xI2Ex6osYSlTkNa4H/cT9UG7jzLZHZh0TBjn1KjGNjvST4BR+pLcmSKxR1FBdPCUXXf6HTzXVcDhwJY1gdzCyvEKGKa9wNWBJAvG/2RvC21i0tM5w4ZSeXXojcWlfYBTTddS2rOYyM7mNnSSB9Uw1QRLRmbzGih9qOGZ20st3Ns4TrMK64dw0toZACZtEaDklucVFOxihJyaooq3FGDuhmY9Efia5dRAaSxwNrbxorfgvs02k8udcxA89UvFuHGe6JGsJcs0HKkHHDNRbYF7JB1QNc8QWzPUyRqtDxSmchgSVBwotDQ1oiLERF1ZEys2Sdzs1Y4VCjyriJe0kOBBm87eBVc6qQV6djOCMfJIBOokqixPA23AZB5rdDkxaMM+NO9GVw9VxIDQSeQBJ+S1Xs9wt9WajhlDSWw4GZtsVZey3CW0nZt4gz1V/iWEjumCk5uRvrH+RuHjtfdJlbgOEubJc+SSYA0CDxFJoBB2MkHqVf4dpyidUJj8I0yXaEEHos0Zu9mpw1oz+MxLGGRE/zRBVcC8/4hgNdpGvpshPaQtptpNod7vSZM22F1reEEuotLmgW20WpvpBSRlS7zcX7GVNVrXQR4ydEU97AAZgeKPxXBw4ucx3eJ1Omt7BZ3jPBHNuaodEwNAjjKM/cCUZw9gfi+MYCCHTzghVTOJwS9kg/l/myrcTVGm6hw4eXwwGTaBqtscaS2YJZm5aCquNc+pncSTOk2VjhqDnOzvEDZswY28kNhcDBa951AIA66T109Ub2wmd9nc7x6i6wcnmRj9uP+TXx+LJ/dk/guK3FHPaGkgNn3W28ihA+JbMnUc4M2QTnBzC1zsp1Ea23N+cInCYhkZiBbUzEj8v19SuQ5N7Z0vBLUxc2aSbkEbWhQ1MTDmNNw50ETEz+yZSYJzDS5/dLVrGBbckWvcRY+H1KDtshJxPGB1S+swLRYAm/OwHorHF8WblaRDcrYgu5lokNm5GyyeLBzFyr6r9ifKboutkLnGcfPuiIBLgTeCdT0UbfaK37FZ2ve8W2UQLuiNQRZ7V+EzOHzV9hsC1oFgQockOuNVFUxRB0MLbKUpaQqMVHbIOLcMpO72QZgbH9k2nw0uaCWttpbTqOSl/E5jCLONAbsr7ySorpFuzNYT2XawkBsgyZ08lYYXhsHMAAR6ojGcTLdBMjbmhqHEHSZBRueSS2AoY46Q3E4bNYhD0eBum7zA2G/mivxTps0lWGExEn7qnOSRahFsjZwWQCT5a+pVnnNNk2PNNdW5OCr8ZjbETKTuT2O1FaCaXG2Gx7pmFNWxLeazZYIUzHmPBG8S9gFkfuWr8W1q4cSbzVTVqE21UL8OX62jkr9Ne5O79i6/qzNyiGuzX2VIMCHEA97wVzSeGgNAHQIJRS8BRbfkLFE6yhjj2seGuJvodvVTDFSFW8QwHaEHM5sHMI+h6IYpN7Ck9aL1rwUlUSEBQqEQwA+KI7SLct0FUFZX4rhlE3LGk/woCtxVgBbEDkjseXZXZPeiyz2Dwj6wBIyiTIOogx6rTjXZXJiJunUUWjcZTLbTA8kM7FUqstqBpANgeenqocVh+zYWtMk6Ei09VmfwdV+KbTqDIHS4llw6NLxbRNhji92JyZZKk0Ox/sgw1SGVQxoaTcEj1lQcMwXYEEd5xcZdpb4Y1hafjNFmHoEEue+oMoPIWkn6LMU6jrjaLT/AC+hWXk8qcl0vQWPjQi+1bEe65jawHSdCd4N0FWYAfEzE6TEx6Iqu6XeIQDG5nOH8sDKwpmkJwzA52Y6DYak7D7ohmJA02Pd0sOuxnkmBjRTAaYi9uWpuoqb2XvAE+qBytkJjjBtZsIV2OOup6bN6IXF1SXhrQYuOh0+6bVqQNgeYsokQZjcQ4SRe9hz6oCjRLrkHrb9VI5xJuiO0hpTO1EBXUM5gWAUowTuQ+SKw7HRYCLW11RTQ/8AJ8wgeR+xZ6o3HA6hNfiGOWc/qTUQ2oIkHVdf0qM/qouaNRl9E3FhpbYqjOLYzVwnqVDX4wwicwjnsiWJ3oF5Y0X7Aw6wiM7OixB9o6Ik5h5aoOt7WMBluYnloEf082B9TBHoJrtlD1ajb8156PbFxPeEDYC581FW9r6h91oHUolxJgvlwN6T1UNfE5RJIXnf9exDz78c4CDrcSqu1eSmx4r9xMuWvZG8r8dpg++J8VXu9rmR7rifRYkvPNaTg/stVqBlSW5SA7W+umiY8OOCuQtZss3UTS8BxVfEOzMpZWbvcfWBur2rg3h13wPBXGAoBrAAFFjKQzBc2WW5aWjpQxNR27ZFhWdmfeDuXgiBUDnCygrOEhEUWwEt/I1EzGXhFkNAVWeIUmHvPaDG5WW477YuJLKAgaGodf8AiNksKzW43i+Hoz2lQNMTl1d6C4VdhvavCPIaKzS50gTIEjYzoeS8rfxDtHEDfUkzNj+6rOIYYZxkmSQBJMd6Ynp90yMFdMXKbS0e6doHTlIPgQY9FXmoKc3sZP3XhVPF4jCVs9IupP0lt2nYiIhw6Fei0vaWpWw7e0a1jzYi4JPVp9y82lHNKCuwYy7Gibj2YlwZTqMGUy6TBgaxOqEx/Ewx00ocRYOIMEc2jdZsYFrH5xcEhzrnXwOmu3JS4hxyt8Tcn6LJk5D8RD6oPfxSo+Q8h4Ii9wB/piIQzyANBMaSoaVWGTv5KKjfvO35GLwRPqsknewhzQX1KbANTLujR+8IurQFNzmv7pyuII8e7I2tJndD8PqNYc5jMXZgTsG2geMqLEYqm50Z2gg2uHEyIO4nU2VXougStjQ73bXtH223Ve4OeLWg/rCLqcOBcSH7iDGtyDI2MQbItmBHlv8AzwhTsl4JRDSpucS6wdqARy1jl+6ZicGRme6+8AXkn5C6sqYa3+XQ3FGGO6dfkl+rvRSM9ULZsfQE+kJ+Hc6ZbDhoQYIHiOdt05uDe02cIPT9ClOGI77WBr98tp8k7ugqLbAUCwA3J66BEZiqBvFntfDwW/6tW9AZuBfqrNvFhGrP+j/ulSi7sGijp1Xg2Lp8SiH8RrGxqOjlMfRT4PF0G995vrEGZMkAiLE31SYrimHeYL2tE3NwRAmwIvK9b9RjbrRxvQyJWV7nSbqUVSREwEYzD0Xz2b81rRcE+KR/DHBpi8JnqRYl45L2A6FEHUnyUNWmQUW4dgQajmtnYm/oLhJRrseAGtc43hzRaCde9CB8jHF7aDjhyPwgFK1G4nAwfeHnb6aprsOKd3Gbbc1UuZhSvsMXGyPVEDZ0G6QtXNxgGaYzfDAsNk6nDYc/NM3Eee+6Q/1HH8MZ9DP5QVgeGvqGwsNSbfXVerey+BLKTGuMwBHovHXcfxEgtfF4DcoIA9L2Wy4H/wCRixgbVoAgQA9ji0HwDgfqkcjlLJE08fjem7Z6sBCExptPJZHB/wDknDucA+nUYDHe7rm+YBzWPRVfGf8AyHRe4so1A2JGZ/dMjcB0D1WSLNbNFxDijW62G5P6Aaqq4r7Qk/4dN7mgg5ne6WnYc/7rKnEAva8u7TMZDgZ2JaDz0XYx731TANtbayDryufkinJPQuN3sn4jxV1YWMA94uMzEgN8ze3RAcSxRAa8NJEz1Os+f3TsacoAbOrGm3vGQAfSPRQO7QOq0nscCx8hpB8Dt1Hr0VKlstimA4umzR62uD6j0Kgre8wm5Y9ubwzCPlPgrNvD3HWRJBJMDe4I8J9UmH4cBWLs2ZtzaIJ63Q+tH5J1LGjhQKbiW3c4mbSADYHpYnzQ1VhgvOjMr53sRI6qxe8ZS2+cRLfiElvwm+/zlRYdjgHNkQ4kEEfCQNPOVjlPewx3bAxvIB5RIBgplZ4kAiYEg210I8fJMxVYNMC/O1lDUrD9Ehy+C0kdi8SCzuuaDcX2A5TqqsY6q0QdNiR57fzRQYjBQ6GkAHbqSEdT4RVe2A10Rud+ZsEa6pbZKKvH4ouAzDbrH8+yZSpS0kgFog3G/wAMK4r8HI/zK1Jg3HaNAtzk3RNPD4UD/wBxTmAPeJHdMtuORmEalaqKb/CI2l5K6vxR7hn7sAgaf2R+GrPMS1wHgdPDre/RPwApF5yuY6BJiQYtJ2nx2UvGWh4aKdU0zZoaczWuP+68nxS1FeooS+38lSf22tji9siJMyDPMeXip2EamPX9Fk8RwKsLlh8r/RR06eIZdgd4aj0KOfDaenf4BUlLfg3GDrZHguBe3XLNrdNEmJxbXVc3YtyG+UjpHwwgeBGvUYM9K14fIg+SKrmO64ELNJyg+sidmLiMNTqOBy0m65Q5vdJ/1NdIt4Kud7D0SSTXYJvDXNyidmy3RWLcqUU29Fcc7Rfc85xNJjXb1HDbRo9NVDV4e94LjlYPEn0aJhMOMMfTmoa+Ic74j57rpJtBUOommyJbLhvLhHgBdW+GxL6vddVeI0AJFvGbqjw+Gc890GyuMPQay7zLtOcc4Vyk/kqi3OHomHVGTFu+4u3jwPmgjiSCTTc4z3ZLhDRyAGm6Er8QkAXtv/OiZw+i0y6q4tpicsES48gD9Uqmtsuiz7VjYmSYEki7j0m4CFx+LzDoNBYT4nUptEsJsJ5NP99VAXhz7iBvCtFh2GrNpNzRNQ31kNaYMHkVW16+d7nu1P2U5pTAGknXX0uhezvAg+B3VohJgAC+HGBui8ZWk/4hcGtjuiOXLRpU2B4eWtD8uZzjDZMNb1MG56evJMxGDGhe0k6kZrcxpdV3VkBxi2RPYlzWmAX1HGwto3Lp5qsxuMBMtYwDduWx6ndXGF4PnkB8AdCfnZWDPZqkYLi50eU+glEssYsFqzIUsUc4IaZmwGlxFo3Wl9mn4tlRuZhdSEiKlgOs2cT42VviMJkg0qWo1Dg39SVU4jjD2nL2eRwOrnBwIOkAb2KKMvWfWK8guoq2aWphhUccwZPI6D/iZSVOIMZJz3Bud56BYqtiHOMlxJUJAO0rS/0yT8yEfUr4Lqv7QPa8skvg85seu6Ow/tGyGhweIi4IsfIysuLbQjsNwms+IYQDu7uj53PkmfQYIq8j/wCgXnnJ/ajTDjlBzi81Ie7UlpBMDKJgRYKxw9VtRsteHDfKZ9eSz2H4FSb/AJlTOfytsPN2p+StcNTizGBoPIa+J3XK5UcC/pyb/wCB8O7X3BVamBEBCYqwtGbqbefIJuLwvaDIHFpG4MFE4IupsDCM5Grne9PyWS1QzwQP4qzDsOXK+q4Q0tEw7nJFhOmsws5icTinyajqzoMOnMADyIFh4LeUH7kX9D4WKkxD8ozRy2mU7Bz8WH/Lt/Lf/gE8Up/3Ujz5nBKxbmyRprYmY213R1P2Yr7Gmf8A7AtbTYCJgXGkeV+aDdTYQQ2GtGoZGu5gAfrHNaf8YzN6SQr6aHu2VvCeB16VQPzMBHJxm+tw0wtTjsMzMMrCTqXNLQB4yRfrCrMHLSYGfkXAMMdSDeJ2AR/bOEExoREyOkyLnqsPK5U80lKaWv8AYbjioKkT4fBNacwzHcyZ2580r8W8tDmNda7mGzy0HrzVc528mfog3Yl4I728968x0O+izQpboPtbNQXg96OWjvtbdQV6RJ90ZTqZA9RqVlXccqYa9OiKoqP71y2HZRe1g0AckdS9o31G3oZCBtUBaSeRy7dVPTktouiyr8PYCDLgelxFtt00YX/Uz1cPkg8LxHMcvaOBMEgxr+kqxFR3M+g+yqmgWeLA7KdpaANz108goGm6lDZ0ErtBh9CplbN5MQNBvPgEPVxBc7vb2gbKR+azYEDlqp6VEA6SIn+zRqgtIsbhaDIOeenXyUbKpc4Q0QNdBb7omo3MB3Zg2i38NkN2lNkjUj8pJM+OgUVvwU9Dg4knroOXJStwhDdT6ddJQR4mW+5TAPMmfpH1Q9fidd3xBv8AtGX5i8eaZ6OV+xXeJbuwjx3jmyyLuOUaXuUO3smyDUZfYHMByu3dUxa93vOJ8STdcMON02PFyMF5EaVvFsO0Ado8gbMZHoXQmu45TB/w6BPV7gPOACqBlMBaz2Z4NTd36t3QHNpkWynRzh8QMW28VJcbHgj3yN/hAPI3pAf9Wrh2XK1p0y5DIkSLE8itBwNuIqEF7WtZvaHHfT09Fbtwkmdzv/bonYzGsw7AXAno1pcT4ALFl5UJR6wgkyKLu2x39NZcm/8AuuB4CICpMWKYc1z2ZQbCcpvyIHj80Q/FmuJDjTB0zNOb/qUdlpmMrZgfFE2Gp5+PVZlNxexn5KmtwxjQ57msAF8xGUNFusfRNo8NpTdgJ5azzI2+agxmOPamzadP46hbIIsBpeepsrfBuGZhb3wGe8yHC9sxAtAjbn0Wl8jJGPllOCvwOpU6bAGtbkaDPuaEjU9YHyQ3EOIYeld7nOJEgDfymyT2h4uaLS2S1xFtJeb952U+7AjbT0wmKxLqji9xkn+ADoncTivkffNugZz6aRpT7VsFmUI8XD7FCP8AairsGt9T+qz8rpXTjwOPH+0Q8s/kuv8A1FWmZaf+P7q14Z7XEQ2qwRHvN1nYmVkZRnCsGa1RrBYG7jyaNT/OarNw+P0faNFKcrPR6WLLmy3Q6ED5g6J1WoQIzaamfrOi6iwABjLNaAPAAQAOtlK4ACF5R0no0uREIjvGbaHT03XOxGw1O+390LiKhE22t/ChcI41AC5pbzAd1/MESTeyVew5tQjeSD4fIKcVpE/z0QxY0SY9NSnOrMtbwUZVWdVqjYqursMTvbeBIHT9EbVcNBrEkeOn0KCqPcTAiAJzEbyBHif0RR0MhC0R4h4LHb5WOcRbQWMTrrHmuzzABLQZAmQDABAHr8lJQxZHehpkQSQCNgByPK6fRcCBraRJEdCL3IsmpDFoTD4aD3i0GZaBMjWZcDEiOe6nFZ3Kesu+y5tBzKmRzfhkdLx62U7qQnUDpmQTbvwBKjzhmIw4tmPm0hWDG08sggA3nn4dLrNPyRoPUylGMdo7S0g/ZdJxb8FmgrYyiwW758z1vO2migr8eLbNayeRb7vQwYJ+SoHVZ0/nJXB4UXGQ2XPJcRpHTWLzpqoscb+4pvQ2txV1VoDgABOk94mJJnw00GyGNQp9fCPbq0+iHzLp4usY1EzyVu2PldKQXsLlFUeHVHR3SAdzYfPVG8iXllUDZk+k0uMNBJ5C6v8ACezzRBqPki5a0SLaST9lfcNZSpf5bIJbGYGTBvGYzA6LJl58Ir7dsJYmZ7hHs3WqOY57SxhIJJsYE6Dnb5rd06LWnNFyA2ZsGicoHQT81XMxoExEmT1mOo+aZWxRO8fsuXyM+TM96QfSvAdjOIhmh5jSZO3gqPE4l7n+9AA2nKJHxX2so313POVgnSSTAH/I76mFPSwLRBq1B/sbMT+qSl1DjGhatdrIOYkloEA2m+g1kp7Xv7MlzOzZAJLnNDRe0ybQYQmN4izDwcuUyQRAzkWve4CCf7UUwDlpOLtnZrHnMzbpCbHFkn+2Nluvcs6/CKlVvvgMkTlmTEEguMCIUGDrUsOAwPyNvzk6k6G822Wdrcdruc4ioWh0d1vuiOQOh1uq6Vtx8GbVTev9AHlrwXHHeJ9q6Guc5g5jU3uJvCq5UZK6V1MUI44qMRErk7ZJK6VGCnBM7FUPBW69nMB2VEOsHv1zDQ6ga8j6lYemYIPJaTgvGC6oG1iDNg6Ig3gmNblYf1COSeOoePcvG4p7NO3FZWjl853+cpoxrjZrZMfy6dUwriJptm8HS+2jryg21X58oEOAsNryNdNV52k9mhRsMq4eQM7oMTBj5fdRAybW0vPjA9bp1PCl2pjcmNdrmP1RuHogd0iwuCSNQSNNj90N0TwAsoOuCc0iJMXmbR4KVmHce78pEW/sjzVYLDvHoAV1HCOqVm02kNB+KRObJIHWx+Z5Kott0ROzPV8W1pAkCTGYi3XziVJ2bgHOiQBLbWBiRcGCDFkXxHgTqdZ/bNaaZEQBYuMEkja5dcbwn0cKylT7ETZxcDIhpAs0WuNZmdSn6Wn5GJ0C67TplM6bmRsJvPOEUKrWt70O6CZ0mJiLzuQq/sHh4PaGJmDlGaIJBOWQLjQeamaXVGdll1g5bEy0ggEt3kA2G2qipBXYU7ESfeYTBIMG9wDteNCZ1smED/5z5XHkc1whaVQ9uXOp3cWudDXFktDjdxEOB8jLeiZVNHMcxgyZHeEHcRt4JmgKPOG4sZMtwS4EmGx3c0bTvppuocXiTUe55JJdBJc7M7/tumOZH3lK0bR5xf8AsugUNNQzmEA9LR4K44EMzsxq94WAJ2HU6D7IajhgyHOaXHWNY8R5q2pVSBLQALCwBMmf3v0S5u1SLRYsxWUgE52t910+6IuALx5Rqr3hfaVqcZBTAuJDYOsEgDS836FVfC+FsB7So4Eahmpn/VtztfVWtbjAaIbpzhYskt1DyVJ2TMwdOmIIDjGzQBv8Isq7G4qb/LlsoHcQL3amOQ680OaLidLTvugin5kSKd7CmVA6/NK4gDkfIpGYdxvBMA7Hrp1sENVqNaSHEW15Eaz080a34DJqtZsglw3ygHU21HPwQ1elUJY7K9zbWLSGSbTmN3bWQ2J4s1jSAWyRIyAE33JNgZA25qrxfGajnAtc5oGl5OkSZnblZaceDJIFySNTUxracmo0gSbxtdtm6zI+qzfHuINqP/w3OyC97GfQHRVVSoXGXEk3166pq2YeLGD7PbFSnfgkc6bkknmblJKYCllbUxdDpXSmgpZV9iUOXJJXSpZVCp7So5SypZTRNnTm1EPmXBynYHoek+yXF+3aKTnkPb0EZRoZi55+CuMZSb3coPviMrYFz3rnneVgfZbECiRUqHK2pLWdS33rm0aCN1o8LiqlV8gtGX4Y93uzM6Ew4LznKxRjlbj4NUFJoO426sGtLBkDnXIDSQ0ETcj9ECXvIJmXAttaSLCQDeJOvQ63UmMomo1rW1DuB3pAM75jpp6Kk4lxF+HOSoA+OhbmjWXD7JUUnqKGRqjTcPpkVGukkNcHXdc2Fj0m0WEKwwtXLUe4giHtyg2JIBII9QJ6XWb4Lx78Q92QNYyNM01JttAGQAxborihULNGyfzEX9UrKnF7KVsKxr3kl2Uk6gzJ+/8AChalIx81L+OcLkW0kSnZ5BSlJgy0UfGMGKjS0Oc1zspa+fciJ01kSNQosHwdlEt7NvaEtLnVXuh+a2ZokEcriFfZAbc0P+EM3Pd5bRzWiOaVUyKSKjjGANapSPfptFnta8XmD33AiwM6D4il7OPgJ6l4k9T3UZxIhoa3tCwvcA0hsydYEtIB8eSj/DeHqUfZtbDUjyuoF1NxBEc1y5dYE0tRggeCfghdvWR5DRcuWWXgNFs4QLclVBxc9oNxIt5pVyUvDLNLRoNaQAABCIIhlOLZonr3Qf1XLlil+4qJnMfxWtlI7RwEHS2hMRCz3EMQ5+XM4m367xquXLr8OK1oDICAJUq5dMQJC5KuUIcAuhcuUKOIXQuXKEFhdCRcoQ5LCRcoQ4hbvg/DqRo0ZY02c64nvd6556D0XLlg57ax6GY/JZ1cOx2VrmggEQCJAtNhspMbSDWkCw6E9Fy5cKDbNEvALwmoYq33jyyg/VYPG13OcS5xJzOE7wJASrlu4/7mASex7oxTY/K7/wDK9IxzyBItf9Ui5I539RfgtF0+g0GALQfoVU9g3Nmi4Frm0m65cssCp+AkGGlA9oeZ3+qVciXkXHwS0XSIN4JidtkmVcuRho//2Q==",
    content:
      "Located northeast of Kathmandu, Panch Pokhari comprises five sacred lakes nestled at the base of the Jugal Himal.",
  },
  {
    id: 8,
    title: "Namche Bazaar",
    subtitle: "Sherpa Capital",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.zMGZBhx8XVTDSBBNTKQQLAHaEo&pid=Api&P=0&h=220",
    content:
      "Namche Bazaar is a bustling town located at 3,440 meters in the Khumbu region. Serving as the gateway to the Everest region.",
  },
  {
    id: 9,
    title: "Jumla",
    subtitle: "Cultural Heart of Karnali",
    image: "https://live.staticflickr.com/65535/52554654038_cfb38cb617_b.jpg",
    content:
      "Jumla, located in the Karnali region, is known for its rich cultural heritage and natural beauty.",
  },
];

export default function TravelBlog() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <header className="relative h-96 bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Nepal's Hidden Gems
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover the lesser-known travel destinations of Nepal
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Nepal landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {selected ? (
          <DetailView destination={selected} onBack={() => setSelected(null)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <DestinationItem
                key={destination.id}
                destination={destination}
                onClick={() => setSelected(destination)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Nepal Travel Explorers</p>
          <p className="mt-2 text-gray-400 text-sm">
            Note: Travel conditions may vary; check local guidelines before
            visiting.
          </p>
        </div>
      </footer>
    </div>
  );
}

function DestinationItem({ destination, onClick }) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold">{destination.title}</h3>
          <p className="text-gray-200">{destination.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function DetailView({ destination, onBack }) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="relative h-96">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-full flex items-center shadow-md transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {destination.title}
        </h1>
        <h2 className="text-xl text-gray-600 mb-6">{destination.subtitle}</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg leading-relaxed">{destination.content}</p>
        </div>
      </div>
    </div>
  );
}
