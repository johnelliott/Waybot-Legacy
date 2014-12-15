e = Math::E
lambda = 5
k = 0
p = 1
L = Math.exp(-1 * lambda)

def next_laplace
  while p > L
    k +=1
    p = p * Random.rand
  end
  return k - 1
end