import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub as RouterLink } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    id: 1,
    produto: 'Video Game',
    descricao: 'Um video game bem bacana, com vários jogos exclusivos.',
    lanceInicial: 1000
  },
  {
    id: 2,
    produto: 'Notebook',
    descricao: 'Completinho, quase novo. A diversão é garantida!',
    lanceInicial: 500
  }
]

describe('um avaliador que se conecta com a API', () => {
  test('mostra todos os leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink
      }
    })
    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('não há leiloes retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink
      }
    })
    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
